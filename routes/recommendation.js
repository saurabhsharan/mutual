
/*
 * GET home page.
 */
 
var twilio_client = require('twilio')('ACd83c5a0ad479b29a437a485422a929e9', '375bd090cd1b4e7b5fed4d9c713fd5c9');

exports.view = function(req, res){
  res.render('recommendation');
};

exports.submit_reco = function(req, res) {
  var person1_number = req.query.person1number;
  var person2_number = req.query.person2number;
  
  twilio_client.sendMessage({
    to: '+18054509609',
    from: '+15102704581',
    body: 'yo'
  }, function(err, responseData) {
    if (err) {
      res.send('could not send text message 1');
    }
  });
  
  setTimeout(function() {
    twilio_client.sendMessage({
      to: '+14088396349',
      from: '+15102704581',
      body: 'yo'
    }, function(err, responseData) {
      if (err) {
        res.send('could not send text message 2');
      }
    });
  }, 1100);
  
  
  
  // twilio_client.sendMessage({
  //   to: '+16464630213',
  //   from: '+15102704581',
  //   body: 'yo 2'
  // }, function(err, responseData) {
  //   if (err) {
  //     res.send('could not send text message');
  //   } else {
  //     res.send('sent text message');
  //   }
  // });
};