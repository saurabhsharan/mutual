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
}

function recommendationClicked(e) {
	window.location = "/detail";
}

function goBackClicked(e) {
	console.log("HERE!");
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