'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function isValidNumber(num) {
  if (num.length != 10) return false;

  if (!$.isNumeric(num)) return false;

  for (var i = 0; i < num.length; i++) {
    var c = num[i];
    if (!(c >= '0' && c <= '9')) {
      return false;
    }
  }
  
  return true;
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#recommendation-navigation .left-button").click(goBackClicked);
	$("#detail-navigation .left-button").click(goBackClicked);
	$("#detail-navigation .right-button").click(textClicked);

//	$(".text-button")
	$('.text-button').click(textClicked);

	$("#index-navigation .right-button").click(createRecommendationClicked);
	$(".recommendation").click(recommendationClicked);

	$(".person-name").on('input', nameChanged);

	$(".friend-tile").on('click', friendSelected);
	
	$("#reco-form").submit(function(e) {
	  var number1 = $("#number1").val();
	  var number2 = $("#number2").val();
	  
	  if (!isValidNumber(number1) || !isValidNumber(number2)) {
	    alert("You must enter both people's numbers as a 10 digit phone number.")
	    e.preventDefault();
	  } else if ($("#text1").val() == "" || $("#text2").val() == "") {
	    alert("You must enter something in the messages field.")
	    e.preventDefault();
	  }
	});
	
	$("#mutualHeader").click(function(e) {
	  e.preventDefault();
	  window.location = "/";
	})
}

function nameChanged(e) {
	console.log("field changed");

	var userInput = $(this).val();

	if (!userInput) userInput = "0"; // input field is blank

	var url = "/friendsearch/" + userInput;
	$.get(url, updateFriendsDisplay);
}

function recommendationClicked(e) {
 	var FBid = $(this).attr("data-fb-id");
	window.location = "/detail/" + FBid;
}

function goBackClicked(e) {
	window.location = "/"; // redirect to home
}

function textClicked(e) {
	var textURL = "sms://" + $("#user-number").text();
	console.log(textURL);
	ga("send", "event", "text", "click");
	
	setTimeout(function() {
	  window.location.href = textURL;
	}, 2000);
}

function createRecommendationClicked(e) 
{
	window.location = "/recommendation";
}

function friendSelected(e) {

	//$(this).toggle("highlight");
	$(this).effect("highlight", {color: '#91aa9d'}, 3000);
	//this.animate({color:'red'}, 300);
        // }, function () {
        // $(this).stop().animate({backgroundColor:'#943D20'}, 100);

	var name = $(this).children(".friend-tile-name").text().split(" ");
	var firstname = name[0];
	var lastname = name[1];
	
	var id = $(this).children(".friend-tile-facebookid").text();

	if (!$("#person1firstname").val()) {
		$("#person1firstname").val(firstname);
		$("#person1lastname").val(lastname);
		$("#person1fbid").val(id);
		$(".person-name").val("");
		$(".person-name").trigger("input");

	} else {
		$("#person2firstname").val(firstname);
		$("#person2lastname").val(lastname);
		$("#person2fbid").val(id);

		// update images
		var picture1 = "http://graph.facebook.com/" + $("#person1fbid").val() + "/picture?width=200&height=200";
		var picture2 = "http://graph.facebook.com/" + id + "/picture?width=200&height=200";
		$("#person-selector1").attr('src', picture1); 
		$("#person-selector2").attr('src', picture2); 

		var person1_firstname = $("#person1firstname").val();
		var person2_firstname = $("#person2firstname").val();

		$(".person1-label").text(person1_firstname);
		$(".person2-label").text(person2_firstname);

		//ambika
		$('label[for=phone1]').text(person1_firstname + "'s  phone number:");
		$('label[for=phone2]').text(person2_firstname + "'s phone number:");

		$('label[for=text1]').text("Message to " + person1_firstname + ":");
		$('label[for=text2]').text("Message to " + person2_firstname + ":");

		$('[name="text1"]').attr("placeholder", "Why should " + person1_firstname + " meet " + person2_firstname + "?");
		$('[name="text2"]').attr("placeholder", "Why should " + person2_firstname + " meet " + person1_firstname + "?");

		$(".peopleselector").show();
		$(".formWrapper").show();
		$(".namefield-container").hide();
		$(".friend-list").hide();

	}
}

function updateFriendsDisplay(result) {

	var html = "";

	for (var friend in result) {
		var friendDiv = '<div class="friend-tile"> <img class="friend-tile-picture" src="' + result[friend].pictureURL + '"> <span class="friend-tile-name">' + result[friend].name 
		+ '</span> <span class="friend-tile-facebookid">' + result[friend].id + '</span></div>';

		html += friendDiv;
	}

	$(".friend-list").html(html);
	
	$(".friend-tile").on('click', friendSelected);

}
