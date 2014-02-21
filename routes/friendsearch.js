
/*
 * GET facebook login page.
 */
 
var request = require('request');

exports.friendsWithPrefix = function(req, res){

  var friendslist = req.session.friendslist;

  for (var friend : friendslist) {
    console.log(friend['name']);
  }

  // // Before rendering the recommendation view, fetch the users facebook friends
  // var friendslistURL = "https://graph.facebook.com/" + req.session.user_id + "/friends" + "?access_token="+ req.session.fb_access_token;
  // console.log(friendslistURL);

  // request(friendslistURL, function(error, response, body) {
  //   var friends = JSON.parse(body);
  //   console.log(friends.data);


  // });

};
