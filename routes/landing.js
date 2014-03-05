
/*
* GET landing page.
*/

var request = require('request');
var models = require('../models');

exports.view = function(req, res) {
  console.log("1");
  if (req.query.alternate === 'true') {
    req.session.alternate = true;
  } else if (req.query.alternate === 'false') {
    req.session.alternate = false;
  }
  
  if (NODE_ENV == 'localhost') {
      console.log("2");
    req.session.fb_access_token = "CAAIoq33YZCcIBAAuo65r70EmXofY7ZALAaDWrjXHXcnrInZB3AVWNZBfhsSpoKJFQXOMBZBK0iJMUvVCClv5b7UxNp4SAbe6CiJOko1rvQm4tcB9LA7kbpqki5De0aTh3ZAzpPF1I2KezOX2FY1oC5qdZCjG0WGAC9gJ7CNui3dPPPtgGhAzf80uvw2EuM40rQZD";
    req.session.user_id = 1495998285;
  }

  console.log("3");

  if (req.session.fb_access_token) {
    res.redirect("feed");
  } else {
      console.log("4");

    if (NODE_ENV == 'localhost') {
      var redirect_url = encodeURIComponent("http://localhost:3000/fblogin");
    } else {
      var redirect_url = encodeURIComponent("http://mutual.herokuapp.com/fblogin");
    }

  }

  var fb_login_url = "https://www.facebook.com/dialog/oauth?client_id=607666969312706&redirect_uri=" + redirect_url;;

  var url = {
    "fb_login_url": fb_login_url
  };

  res.render('landing', url);
};