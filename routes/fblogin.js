
/*
 * GET facebook login page.
 */
 
var request = require('request');
var models = require('../models');

exports.view = function(req, res) {
  var permissions = "read_friendlists"
  var fb_code = req.query.code;

  if (NODE_ENV == 'localhost') {
    var redirect_uri = encodeURIComponent("http://localhost:3000/fblogin");
  } else {
    var redirect_uri = encodeURIComponent("http://mutual.herokuapp.com/fblogin");
  }

  var access_token_url = "https://graph.facebook.com/oauth/access_token?client_id=607666969312706&redirect_uri=" + redirect_uri + 
  "&client_secret=300b02a4cbc79db08ce874b7aa2a2f71&code=" + fb_code +
  "&permissions=" + permissions;

  request(access_token_url, function(error, response, body) {

    if (error) console.log(error);

    req.session.fb_access_token = body.substring(13, body.indexOf("&"));

    // After user is logged in, save their facebook id

    var userDataURL = "https://graph.facebook.com/me?access_token=" + req.session.fb_access_token;
    
    request(userDataURL, function(error, response, body) {

      var user_info = JSON.parse(body);
      console.log(user_info.first_name + " logged in with access_token: " + req.session.fb_access_token);
      req.session.user_id = user_info.id;
      req.session.first_name = user_info.first_name;
      req.session.last_name = user_info.last_name;
      
      models.User.find({"facebookID": user_info.id}).exec(function(err, users) {
        if (!users) {
          var newUser = new models.User({
            "first_name": user_info.first_name,
            "last_name": user_info.last_name,
            "facebookID": user_info.id
          });
          
          newUser.save(function(err) {
            res.redirect("/feed");
          });
        } else {
          res.redirect("/feed");
        }
      });
    });

  });

};
