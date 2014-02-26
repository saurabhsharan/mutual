
var Mongoose = require('mongoose');


var RecommendationSchema = new Mongoose.Schema({

  recommender : 
  { 
    first_name: String,
    last_name: String,
    facebookID: String,
    picture: String
  },

  recommendee1 : 
  { 
    first_name: String,
    last_name: String,
    facebookID: String,
    picture: String,
    phone: String,
    text: String
  },

  recommendee2 : 
  { 
    first_name: String,
    last_name: String,
    facebookID: String,
    picture: String,
    phone: String,
    text: String
  }

});

var UserSchema = new Mongoose.Schema({
  first_name: String,
  last_name:  String,
  facebookID: String
})

exports.Recommendation = Mongoose.model('Recommendation', RecommendationSchema);
exports.User = Mongoose.model('User', UserSchema);


