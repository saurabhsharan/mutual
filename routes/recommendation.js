
/*
 * GET home page.
 */
 
var twilio_client = require('twilio')('AC2a13ff62788619cdd2f0702a666efa50', 'a3f07171de4a3b3daf8f3160cd127dd8');

exports.view = function(req, res){
  res.render('recommendation');
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