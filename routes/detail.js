//Seed data for if user taps on the first recommendation in index
var request = require('request');
var models = require('../models');

exports.view = function(req, res) {
  var FBid = req.params.fbid;
  
  models.Recommendation
    .find({"recommendee2_facebookID": FBid})
    .exec(function(err, recommendations) {
      console.log("detail: " + recommendations);
      recommendations = {
        "recommendations": recommendations
      };
      res.render('detail', recommendations);
    });
};