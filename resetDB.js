var mongoose = require('mongoose');
var models   = require('./models');

var local_database_name = 'mutual';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var users_json = require('./users.json');
models.User.find().remove().exec(function(err) {
  if (err) {
    console.log("Error when deleting users: " + err);
  }
    
  var to_save_count = users_json.length;
  for (var i = 0; i < users_json.length; i++) {
    var json = users_json[i];
    var user = new models.User(json);
    
    user.save(function(err, user) {
      if (err) {
        console.log("Error when saving user: " + err);
      }
      
      to_save_count--;
      if (to_save_count <= 0) {
        console.log("Finished saving users");
        
        var recommendations_json = require('./recommendations.json');
        
        models.Recommendation.find().remove().exec(function(err) {
          if (err) {
            console.log("Error when deleting recommendations: " + err);
            
            var to_save_count = recommendations_json.length;
            for (var i = 0; i < recommendations_json.length; i++) {
              var json = recommendations_json[i];
              var rec = new models.Recommendation(json);

              rec.save(function(err, rec) {
                if (err) {
                  console.log("Error when saving recommendation: " + err);
                }

                to_save_count--;
                if (to_save_count <= 0) {
                  console.log("Finished saving recommendations");
                }
              });
            }
          }
        });
      }
    });
  }
});