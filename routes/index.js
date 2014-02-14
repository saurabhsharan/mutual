
/*
* GET home page.
*/

var request = require('request');

exports.view = function(req, res) {
 // if (req.session.fb_access_token) {
    res.render('index', {
      'recommendations': [
        {
          "recommender": {
            "first_name": "Saurabh",
            "last_name": "Sharan",
            "facebookID": "100001497771693",
            "facebookAccessToken": "XXXXX",
            "picture_url": "images/saurabh.jpg",
            "id": "1"
          },
          "recommendee1": {
            "first_name": "Nathan",
            "last_name": "Eidelson",
            "facebookID": "1495998285",
            "facebookAccessToken": "XXXXX",
            "picture_url": "images/nathan.jpg",
            "id": "2"
          },
          "recommendee2": {
            "first_name": "Ambika",
            "last_name": "Acharya",
            "facebookID": "1128653899",
            "facebookAccessToken": "XXXXX",
            "picture_url": "images/ambika.jpg",
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
            "picture_url": "images/nicholas.jpg",
            "id": "4"
          },
          "recommendee1": {
            "first_name": "Nathan",
            "last_name": "Eidelson",
            "facebookID": "XXXXX",
            "facebookAccessToken": "XXXXX",
            "picture_url": "images/nathan.jpg",
            "id": "2"
          },
          "recommendee2": {
            "first_name": "Ambika",
            "last_name": "Acharya",
            "facebookID": "1128653899",
            "facebookAccessToken": "XXXXX",
            "picture_url": "images/ambika.jpg",
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
  //   } else {
  //     var redirect_uri = encodeURIComponent("http://localhost:3000/fblogin");
  //     var fb_login_url = "https://www.facebook.com/dialog/oauth?client_id=607666969312706&redirect_uri=" + redirect_uri;
  //     res.redirect(fb_login_url);
  //   }
  // };
}
