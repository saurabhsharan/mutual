
/*
 * GET home page.
 */
 
var twilio_client = require('twilio')('AC2a13ff62788619cdd2f0702a666efa50', 'a3f07171de4a3b3daf8f3160cd127dd8');
var request = require('request');
  var models = require('../models');

exports.view = function(req, res){
  if (!req.session.fb_access_token) {
    res.redirect("/");
  }

  // Before rendering the recommendation view, fetch the users facebook friends
  var friendslistURL = "https://graph.facebook.com/" + req.session.user_id + "/friends" + "?access_token="+ req.session.fb_access_token;
  console.log(friendslistURL);

  request(friendslistURL, function(error, response, body) {
    var friends = JSON.parse(body);
    req.session.friendslist = friends.data;

    for (var friend in friends.data) {
      friends.data[friend].pictureURL = "http://graph.facebook.com/" + friends.data[friend].id + "/picture?width=100&height=100";
    }
    console.log(friends);
    res.render('recommendation', friends);

  });

};

exports.submit_reco = function(req, res) {
  var person1_number = req.query.person1number;
  var person2_number = req.query.person2number;

  var newRecommendation = new models.Recommendation({

    recommender : 
    { 
      first_name: req.session.first_name,
      last_name: req.session.last_name,
      facebookID: req.session.user_id,
      picture: "graph.facebook.com/" + req.session.user_id + "/picture?width=200&height=200"
    },

    recommendee1 : 
    { 
      first_name: req.query.person1firstname,
      last_name: req.query.person1lastname,
      facebookID: req.query.person1fbid,
      picture: "graph.facebook.com/" + req.query.person1fbid + "/picture?width=200&height=200",
      phone: person1_number,
      text: req.query.text1
    },

    recommendee2 : 
    { 
      first_name: req.query.person2firstname,
      last_name: req.query.person2lastname,
      facebookID: req.query.person2fbid,
      picture: "graph.facebook.com/" + req.query.person2fbid + "/picture?width=200&height=200",
      phone: person2_number,
      text: req.query.text2
    }
  
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
      body: req.session.first_name + " " + req.session.last_name + " recommended that you meet " + req.query.person2firstname + " " + req.query.person2lastname + ". Go to http://mutual.herokuapp.com for more info!"
    });
    
    setTimeout(function() {
      twilio_client.sendMessage({
        to: '+1' + person2_number,
        from: '+18052840161',
        body: req.session.first_name + " " + req.session.last_name + " recommended that you meet " + req.query.person1firstname + " " + req.query.person1lastname + ". Go to http://mutual.herokuapp.com for more info!"
      });
    }, 500);
    
    res.redirect("/");
  }
};


