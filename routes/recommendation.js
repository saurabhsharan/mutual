
/*
 * GET home page.
 */
 
var twilio_client = require('twilio')('AC2a13ff62788619cdd2f0702a666efa50', 'a3f07171de4a3b3daf8f3160cd127dd8');
var request = require('request');
  var models = require('../models');

exports.view = function(req, res){

  // Before rendering the recommendation view, fetch the users facebook friends
  var friendslistURL = "https://graph.facebook.com/" + req.session.user_id + "/friends" + "?access_token="+ req.session.fb_access_token;
  console.log(friendslistURL);

  request(friendslistURL, function(error, response, body) {
    var friends = JSON.parse(body);
    req.session.friendslist = friends.data;

    res.render('recommendation', friends);

  });

};

exports.submit_reco = function(req, res) {
  var person1_number = req.query.person1number;
  var person2_number = req.query.person2number;

  var newRecommendation = new models.Recommendation({
    "recommender": req.session.first_name + " " + req.session.last_name,
    "recommenderFBid": req.session.user_id,
    "recommenderPicture": "graph.facebook.com/" + req.session.user_id + "/picture?width=200&height=200",
    "recommendee1": req.query.person1name,
    "recommendee2": req.query.person1name,
    "recommendee1FBid": req.query.person1fbid,
    "recommendee2FBid": req.query.person2fbid,
    "cellphone1": person1_number,
    "cellphone2": person2_number,
    "textFor1": req.query.text1,
    "textFor2": req.query.text2,
    "recommendee1Picture": "graph.facebook.com/" + req.query.person1fbid + "/picture?width=200&height=200",
    "recommendee2Picture": "graph.facebook.com/" + req.query.person2fbid + "/picture?width=200&height=200",
  })
  newRecommendation.save(afterSaving);
  function afterSaving(err){
    if(err){
      console.log(err);
      res.send(500);
    }
    twilio_client.sendMessage({
      to: '+1' + person1_number,
      from: '+18052840161',
      body: req.query.text1 + " Go to http://mutual.herokuapp.com/detail for more info!"
    });
    
    setTimeout(function() {
      twilio_client.sendMessage({
        to: '+1' + person2_number,
        from: '+18052840161',
        body: req.query.text2 + " Go to http://mutual.herokuapp.com/detail for more info!"
      });
    }, 1100);
    
    res.redirect("/");
  }
};


