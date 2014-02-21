
/*
 * GET facebook login page.
 */
 
var request = require('request');

exports.friendsWithPrefix = function(req, res){
  var friendslist = req.session.friendslist;
  var results = new Array();
  var prefix = req.params.prefix.toLowerCase();

  for (var friend in friendslist) {
    var friendName = friendslist[friend].name.toLowerCase();
    if (friendName.search(prefix) == 0) {
      results.push(friendslist[friend]);
    }
  }

  res.json(results);
};
