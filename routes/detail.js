//Seed data for if user taps on the first recommendation in index
var request = require('request');
var models = require('../models');

exports.view = function(req, res) {
  var FBid = req.params.fbid;
  
  //NEED TO FIX THE BELOW QUERY
  models.Recommendation
    .find({recommendee2.facebookID: FBid, recommendee1.facebookID: req.session.user_id})
    .exec(function(err, recommendations) {
      console.log("detail: " + recommendations);
      recommendations = {
        "recommendations": recommendations
      };
      res.render('detail', recommendations);
    });
};