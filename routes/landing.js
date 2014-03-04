
/*
* GET landing page.
*/

var request = require('request');
var models = require('../models');

exports.view = function(req, res) {
  if (req.session.fb_access_token) {
    res.redirect("/feed");
  } else {
    if (NODE_ENV == 'localhost') {
      var redirect_url = encodeURIComponent("http://localhost:3000/fblogin");
    } else {
      var redirect_url = encodeURIComponent("http://mutual.herokuapp.com/fblogin");
    }
  }
    
  var fb_login_url = "https://www.facebook.com/dialog/oauth?client_id=607666969312706&redirect_uri=" + redirect_url;
  
  var url = {
    "fb_login_url": fb_login_url
  };

  res.render('landing', url);
};