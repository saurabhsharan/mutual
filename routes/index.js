
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index', {
    'recommendations': [
	
	{
    	"recommender": {
        "first_name": "Smarty",
        "last_name": "Boy",
        "facebookID": "XXXXX",
        "facebookAccessToken": "XXXXX",
        "id": "1"
	    },
	    "recommendee1": {
	        "first_name": "Tom",
	        "last_name": "Smith",
	        "facebookID": "XXXXX",
	        "facebookAccessToken": "XXXXX",
	        "id": "2"
	    },
	    "recommendee2": {
	        "first_name": "Sarah",
	        "last_name": "Day",
	        "facebookID": "XXXXX",
	        "facebookAccessToken": "XXXXX",
	        "id": "3"
	    },
	    "id": "1"
	},

	{
    	"recommender": {
        "first_name": "Smarty",
        "last_name": "Boy",
        "facebookID": "XXXXX",
        "facebookAccessToken": "XXXXX",
        "id": "1"
	    },
	    "recommendee1": {
	        "first_name": "Bob",
	        "last_name": "Dylan",
	        "facebookID": "XXXXX",
	        "facebookAccessToken": "XXXXX",
	        "id": "4"
	    },
	    "recommendee2": {
	        "first_name": "Norah",
	        "last_name": "Jones",
	        "facebookID": "XXXXX",
	        "facebookAccessToken": "XXXXX",
	        "id": "5"
	    },
	    "id": "2"
	}

    ]  
  });
};