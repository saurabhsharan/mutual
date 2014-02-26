
/*
* GET home page.
*/

var request = require('request');
var models = require('../models');

exports.view = function(req, res) {

  if (!req.session.fb_access_token) {
    var redirect_uri = encodeURIComponent("http://localhost:3000/fblogin");
    //var redirect_uri = encodeURIComponent("http://mutual.herokuapp.com/fblogin");
    var fb_login_url = "https://www.facebook.com/dialog/oauth?client_id=607666969312706&redirect_uri=" + redirect_uri;
    res.redirect(fb_login_url);
    return;
  }
  
  
  console.log(req.session.user_id);
  
  models.Recommendation.find().exec(function(err, recommendations) {
     console.log("all: " + recommendations);
   });



  models.Recommendation
    .find({$or: [{"recommendee1.facebookID": req.session.user_id}, {"recommendee2.facebookID": req.session.user_id}]})
    .exec(afterQuery);

  function afterQuery(err, recommendations) {
    console.log("query: " + recommendations);
    
    for (recommendation in recommendations) {
      if (recommendation.recommendee2.facebookID == req.session.user_id) {
        var temp = recommendation.recommendee1;
        recommendation.recommendee1 = recommendation.recommendee2;
        recommendation.recommendee2 = temp;
      }
    }

    allRecommendations = {
      "allRecommendations": recommendations
    };
    
    res.render('index', allRecommendations)
  
  }

  // res.render('index', {
  //   'recommendations': [
  //   {
  //     "recommender": {
  //       "first_name": "Saurabh",
  //       "last_name": "Sharan",
  //       "facebookID": "100001497771693",
  //       "facebookAccessToken": "XXXXX",
  //       "picture_url": "images/saurabh.jpg",
  //       "id": "1"
  //     },
  //     "recommendee1": {
  //       "first_name": "Nathan",
  //       "last_name": "Eidelson",
  //       "facebookID": "1495998285",
  //       "facebookAccessToken": "XXXXX",
  //       "picture_url": "images/nathan.jpg",
  //       "id": "2"
  //     },
  //     "recommendee2": {
  //       "first_name": "Ambika",
  //       "last_name": "Acharya",
  //       "facebookID": "1128653899",
  //       "facebookAccessToken": "XXXXX",
  //       "picture_url": "images/ambika.jpg",
  //       "id": "3"
  //     },
  //     "id": "1"
  //   },
  
  //   {
  //     "recommender": {
  //       "first_name": "Nicholas",
  //       "last_name": "Perkins",
  //       "facebookID": "1617551769",
  //       "facebookAccessToken": "XXXXX",
  //       "picture_url": "images/nicholas.jpg",
  //       "id": "4"
  //     },
  //     "recommendee2": {
  //       "first_name": "Nathan",
  //       "last_name": "Eidelson",
  //       "facebookID": "XXXXX",
  //       "facebookAccessToken": "XXXXX",
  //       "picture_url": "images/nathan.jpg",
  //       "id": "2"
  //     },
  //     "recommendee1": {
  //       "first_name": "Ambika",
  //       "last_name": "Acharya",
  //       "facebookID": "1128653899",
  //       "facebookAccessToken": "XXXXX",
  //       "picture_url": "images/ambika.jpg",
  //       "id": "5"
  //     },
  //     "id": "2"
  //   }
  //   ]
  // });
  
  // request("https://graph.facebook.com/me?access_token=" + req.session.fb_access_token, function(error, response, body) {
    //   var user_info = JSON.parse(body);
    //   res.send("Hello, " + user_info['name']);
    // });*/
}