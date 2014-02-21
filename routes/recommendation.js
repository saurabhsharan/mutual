
/*
 * GET home page.
 */
 
var twilio_client = require('twilio')('AC2a13ff62788619cdd2f0702a666efa50', 'a3f07171de4a3b3daf8f3160cd127dd8');
var request = require('request');
// var Bloodhound = require()

exports.view = function(req, res){

  // Before rendering the recommendation view, fetch the users facebook friends
  var friendslistURL = "https://graph.facebook.com/" + req.session.user_id + "/friends" + "?access_token="+ req.session.fb_access_token;
  console.log(friendslistURL);

  request(friendslistURL, function(error, response, body) {
    var friends = JSON.parse(body);
    console.log(friends.data);

    // instantiate the bloodhound suggestion engine
    var numbers = new Bloodhound({
      datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: [
        { num: 'one' },
        { num: 'two' },
        { num: 'three' },
        { num: 'four' },
        { num: 'five' },
        { num: 'six' },
        { num: 'seven' },
        { num: 'eight' },
        { num: 'nine' },
        { num: 'ten' }
      ]
    });
     
    // initialize the bloodhound suggestion engine
    numbers.initialize();
     
    // instantiate the typeahead UI
    $('.example-numbers .typeahead').typeahead(null, {
      displayKey: 'num',
      source: numbers.ttAdapter()
    });

    res.render('recommendation', friends);

  });

};

exports.submit_reco = function(req, res) {
  var person1_number = req.query.person1number;
  var person2_number = req.query.person2number;

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
};