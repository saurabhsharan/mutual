//Seed data for if user taps on the first recommendation in index
var request = require('request');

exports.view = function(req, res){
  res.render('detail', {
    'recommendations': [
        {
        	"recommender": {
                "first_name": "Ambika",
                "last_name": "Acharya",
                "facebookID": "XXXXX",
                "facebookAccessToken": "XXXXX",
                "picture_url": "https://graph.facebook.com/ambika.acharya.37/picture?width=200&height=200",
                "id": "1"
    	    },
    	    "recommendee": {
    	        "first_name": "Nathan",
    	        "last_name": "Eidelson",
    	        "facebookID": "XXXXX",
    	        "facebookAccessToken": "XXXXX",
                "picture_url": "https://graph.facebook.com/neidelson/picture?width=200&height=200",
                "phone_number": "+18054509609",
    	        "id": "2"
    	    },
    	    "id": "1",
    	    "why": "Because he is awesome."
	    },
	    
	    {
        	"recommender": {
                "first_name": "Saurabh",
                "last_name": "Sharan",
                "facebookID": "XXXXX",
                "facebookAccessToken": "XXXXX",
                "picture_url": "https://graph.facebook.com/saurabhsharan/picture?width=200&height=200",
                "id": "1"
    	    },
    	    "recommendee": {
    	        "first_name": "Nathan",
    	        "last_name": "Eidelson",
    	        "facebookID": "XXXXX",
    	        "facebookAccessToken": "XXXXX",
                "picture_url": "https://graph.facebook.com/neidelson/picture?width=200&height=200",
                "phone_number": "+18054509609",
    	        "id": "2"
    	    },
    	    "id": "2",
    	    "why": "Because he is awesome."
	    },
    ]  
  });
};