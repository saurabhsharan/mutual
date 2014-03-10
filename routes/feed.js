
/*
* GET feed page.
*/

var request = require('request');
var models = require('../models');

exports.view = function(req, res) {

  if (!req.session.fb_access_token) {
    res.redirect("/");
  }

  if (req.query.alternate === 'true') {
    req.session.alternate = true;
  } else if (req.query.alternate === 'false') {
    req.session.alternate = false;
  }

  console.log(req.session.user_id);

  models.Recommendation
    .find({$or: [{"recommendee1.facebookID": req.session.user_id}, {"recommendee2.facebookID": req.session.user_id}]})
    .sort({_id: -1})
    .exec(afterQuery);

  function afterQuery(err, recommendations) {

    for (var i = 0; i < recommendations.length; i++) {
      if (recommendations[i].recommendee2.facebookID == req.session.user_id) {

        var temp_json = recommendations[i].recommendee1;
        var temp = JSON.parse(JSON.stringify(temp_json));
        recommendations[i].recommendee1 = recommendations[i].recommendee2;
        recommendations[i].recommendee2 = temp;
      }
    }

    allRecommendations = {
      "recommendations": recommendations
    };
    
    res.render('feed', allRecommendations)
  }
}