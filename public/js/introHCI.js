'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	$("#recommendation-navigation .left-button").click(goBackClicked);
	$("#detail-navigation .left-button").click(goBackClicked);
	$("#detail-navigation .right-button").click(textClicked);

	$("#index-navigation .right-button").click(createRecommendationClicked);
	$(".recommendation").click(recommendationClicked);
	
	$('.personselect').click(function(e) {
	  e.preventDefault();
	  var friendName = prompt("Enter in this person's name");
    $(this).text(friendName);
	});

	$(".person-name").on('input', nameChanged);

	$(document).on('click', '.friend-tile',friendSelected);

}

function nameChanged(e) {
	var userInput = $(this).val();

	if (!userInput) return false; // input field is blank

	var url = "/friendsearch/" + userInput;
	$.get(url, updateFriendsDisplay);

}

function recommendationClicked(e) {
	window.location = "/detail";
}

function goBackClicked(e) {
	window.location = "/"; // redirect to home
}

function textClicked(e) {
	console.log($("#user-number").html());
	window.location.href = "sms:1-408-555-1212";
}

function createRecommendationClicked(e) 
{
	window.location = "/recommendation";
}

//this.css('visibility', 'visible');

function friendSelected(e) {

	console.log("HERE!");
	var name = $(this).children(".friend-tile-name").text();
	var id = $(this).children(".friend-tile-facebookid").text();

	console.log(name);
	console.log(id);

	if (!$("#person1name").val()) {
		$("#person1name").val(name);
		$("#person1fbid").val(id);
		$("person-name").val("");
	} else {
		$("#person2name").val(name);
		$("#person2fbid").val(id);
		$(".peopleselector").show();
		$(".formWrapper").show();
		$(".namefield-container").hide();
		$(".friend-list").hide();

		// $(".peopleselector").css('visibility', 'visible');
		// $(".formWrapper").css('visibility', 'visible');
	}

	  // <input type="hidden" id="person1name" name="person1name"></input>
   //    <input type="hidden" id="person1fbid" name="person1fbid"></input>
   //    <input type="hidden" id="person2name" name="person2name"></input>
   //    <input type="hidden" id="person2fbid" name="person2fbid"></input>
}

function updateFriendsDisplay(result) {

	var html = "";

	for (var friend in result) {
		var friendDiv = '<div class="friend-tile"> <span class="friend-tile-name">' + result[friend].name 
		+ '</span> <span class="friend-tile-facebookid">' + result[friend].id + '</span></div>';

		html += friendDiv;
	}

	$(".friend-list").html(html);
}

