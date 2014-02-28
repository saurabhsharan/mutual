
/*
* GET home page.
*/

var request = require('request');
var models = require('../models');

exports.view = function(req, res) {

  if (!req.session.fb_access_token) {
    var redirect_uri = encodeURIComponent("http://localhost:3000/fblogin");
    // var redirect_uri = encodeURIComponent("http://mutual.herokuapp.com/fblogin");
    var fb_login_url = "https://www.facebook.com/dialog/oauth?client_id=607666969312706&redirect_uri=" + redirect_uri;
    res.redirect(fb_login_url);
    return;
  }
  
  
  console.log(req.session.user_id);

  models.Recommendation
    .find({$or: [{"recommendee1.facebookID": req.session.user_id}, {"recommendee2.facebookID": req.session.user_id}]})
    .exec(afterQuery);

  function afterQuery(err, recommendations) {

    for (var i = 0; i < recommendations.length; i++) {
      if (recommendations[i].recommendee2.facebookID == req.session.user_id) {

        var temp_json = recommendations[i].recommendee1;
        var temp = JSON.parse(JSON.stringify(temp_json));
        recommendations[i].recommendee1 = recommendations[i].recommendee2;
        recommendations[i].recommendee2 = temp;
      }
    }

    allRecommendations = {
      "recommendations": recommendations
    };
    
    res.render('index', allRecommendations)
  
  }

  
  // request("https://graph.facebook.com/me?access_token=" + req.session.fb_access_token, function(error, response, body) {
    //   var user_info = JSON.parse(body);
    //   res.send("Hello, " + user_info['name']);
    // });*/
}