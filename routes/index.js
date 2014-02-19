
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
            "first_name": "Saurabh",
            "last_name": "Sharan",
            "facebookID": "100001497771693",
            "facebookAccessToken": "XXXXX",
            "picture_url": "https://graph.facebook.com/saurabhsharan/picture?width=200&height=200",
            "id": "1"
          },
          "recommendee1": {
            "first_name": "Nathan",
            "last_name": "Eidelson",
            "facebookID": "1495998285",
            "facebookAccessToken": "XXXXX",
            "picture_url": "https://graph.facebook.com/neidelson/picture?width=200&height=200",
            "id": "2"
          },
          "recommendee2": {
            "first_name": "Ambika",
            "last_name": "Acharya",
            "facebookID": "1128653899",
            "facebookAccessToken": "XXXXX",
            "picture_url": "https://graph.facebook.com/ambika.acharya.37/picture?width=200&height=200",
            "id": "3"
          },
          "id": "1"
        },

        {
          "recommender": {
            "first_name": "Nicholas",
            "last_name": "Perkins",
            "facebookID": "1617551769",
            "facebookAccessToken": "XXXXX",
            "picture_url": "https://graph.facebook.com/nickperkins94/picture?width=200&height=200",
            "id": "4"
          },
          "recommendee2": {
            "first_name": "Nathan",
            "last_name": "Eidelson",
            "facebookID": "XXXXX",
            "facebookAccessToken": "XXXXX",
            "picture_url": "https://graph.facebook.com/neidelson/picture?width=100&height=100",
            "id": "2"
          },
          "recommendee1": {
            "first_name": "Ambika",
            "last_name": "Acharya",
            "facebookID": "1128653899",
            "facebookAccessToken": "XXXXX",
            "picture_url": "https://graph.facebook.com/ambika.acharya.37/picture?width=200&height=200",
            "id": "5"
          },
          "id": "2"
        }
      ]
    });

  } else {
    var redirect_uri = encodeURIComponent("http://localhost:3000/fblogin");
    var fb_login_url = "https://www.facebook.com/dialog/oauth?client_id=607666969312706&redirect_uri=" + redirect_uri;
    res.redirect(fb_login_url);
  }
};

