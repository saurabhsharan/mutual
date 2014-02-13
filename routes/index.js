
/*
* GET home page.
*/

var request = require('request');

exports.view = function(req, res) {
  if (req.session.fb_access_token) {
    res.render('index', {
      'recommendations': [
        {
          "recommender": {
            "first_name": "Smarty",
            "last_name": "Boy",
            "facebookID": "XXXXX",
            "facebookAccessToken": "XXXXX",
            "id": "1"
          },
          "recommendee1": {
            "first_name": "Tom",
            "last_name": "Smith",
            "facebookID": "XXXXX",
            "facebookAccessToken": "XXXXX",
            "id": "2"
          },
          "recommendee2": {
            "first_name": "Sarah",
            "last_name": "Day",
            "facebookID": "XXXXX",
            "facebookAccessToken": "XXXXX",
            "id": "3"
          },
          "id": "1"
        },

        {
          "recommender": {
            "first_name": "Smarty",
            "last_name": "Boy",
            "facebookID": "XXXXX",
            "facebookAccessToken": "XXXXX",
            "id": "1"
          },
          "recommendee1": {
            "first_name": "Bob",
            "last_name": "Dylan",
            "facebookID": "XXXXX",
            "facebookAccessToken": "XXXXX",
            "id": "4"
          },
          "recommendee2": {
            "first_name": "Norah",
            "last_name": "Jones",
            "facebookID": "XXXXX",
            "facebookAccessToken": "XXXXX",
            "id": "5"
          },
          "id": "2"
        }
      ]
    });
    // request("https://graph.facebook.com/me?access_token=" + req.session.fb_access_token, function(error, response, body) {
      //   var user_info = JSON.parse(body);
      //   res.send("Hello, " + user_info['name']);
      // });
    } else {
      var redirect_uri = encodeURIComponent("http://localhost:3000/fblogin");
      var fb_login_url = "https://www.facebook.com/dialog/oauth?client_id=607666969312706&redirect_uri=" + redirect_uri;
      res.redirect(fb_login_url);
    }
  };
