//Seed data for if user taps on the first recommendation in index

exports.view = function(req, res){
  res.render('detail', {
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
	}

    ]  
  });
};