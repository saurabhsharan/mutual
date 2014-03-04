//Seed data for if user taps on the first recommendation in index
var request = require('request');
var models = require('../models');

exports.view = function(req, res) {
  if (!req.session.fb_access_token) {
    res.redirect("/");
  }
  
  var FBid = req.params.fbid;

  //NEED TO FIX THE BELOW QUERY
  models.Recommendation
    .find({$or: [{$and: [{"recommendee2.facebookID": FBid}, {"recommendee1.facebookID": req.session.user_id}]}
                ,{$and: [{"recommendee1.facebookID": FBid}, {"recommendee2.facebookID": req.session.user_id}]}
                ]})    
    .exec(function(err, recommendations) {

      for (var i = 0; i < recommendations.length; i++) {
        if (recommendations[i].recommendee2.facebookID == req.session.user_id) {

          var temp_json = recommendations[i].recommendee1;
          var temp = JSON.parse(JSON.stringify(temp_json));
          recommendations[i].recommendee1 = recommendations[i].recommendee2;
          recommendations[i].recommendee2 = temp;
        }
      }

      recommendations = {
        "recommendations": recommendations,
        "recommendee": recommendations[0].recommendee2
      };
      
      if (req.session.alternate || req.params.alternate) {
        res.render('detail2', recommendations);
      } else {
        res.render('detail', recommendations);
      }
    });
};