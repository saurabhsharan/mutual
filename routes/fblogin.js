
/*
 * GET facebook login page.
 */
 
var request = require('request');

exports.view = function(req, res){

  var permissions = "read_friendlists"
  var fb_code = req.query.code;
  var redirect_uri = encodeURIComponent("http://localhost:3000/fblogin");

  var access_token_url = "https://graph.facebook.com/oauth/access_token?client_id=607666969312706&redirect_uri=" + redirect_uri + 
  "&client_secret=300b02a4cbc79db08ce874b7aa2a2f71&code=" + fb_code +
  "&permissions=" + permissions;

  request(access_token_url, function(error, response, body) {
    req.session.fb_access_token = body.substring(13, body.indexOf("&"));

    // After user is logged in, save their facebook id
    
    var userDataURL = "https://graph.facebook.com/me?access_token=" + req.session.fb_access_token;
    request(userDataURL, function(error, response, body) {
      var user_info = JSON.parse(body);
      req.session.user_id = user_info.id;
      res.redirect("/");
    });

	// var permissionsURL = "https://graph.facebook.com/" + user_info.id + "/permissions" + "?access_token="+ req.session.fb_access_token;
	// request(permissionsURL, function(error, response, body) {
	//   var permissions = JSON.parse(body);
	//   console.log(permissions);
	// });

  });

};
