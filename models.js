
var Mongoose = require('mongoose');


var RecommendationSchema = new Mongoose.Schema({
  "recommender": String,
  "recommenderFBid": String,
  "recommendee1": String,
  "recommendee2": String,
  "recommendee1FBid": String,
  "recommendee2FBid": String,
  "cellPhone1": String,
  "cellPhone2": String,
  "textFor1": String,
  "textFor2": String
});

var UserSchema = new Mongoose.Schema({
  "firstName": String,
  "lastName": String,
  "facebookID": String
})

exports.Recommendation = Mongoose.model('Recommendation', RecommendationSchema);
exports.User = Mongoose.model('User', UserSchema);


