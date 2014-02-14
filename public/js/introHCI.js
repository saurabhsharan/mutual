'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	$("#submit-button").click(submitRecommendationClicked);
	$("#recommendation-navigation .left-button").click(goBackClicked);
	$("#detail-navigation .left-button").click(goBackClicked);
	$("#detail-navigation .right-button").click(textClicked);

	$("#index-navigation .right-button").click(createRecommendationClicked);
	$(".recommendation").click(recommendationClicked);

}


function submitRecommendationClicked(e) {
	e.preventDefault();

	//<a href="sms:1-408-555-1212">New SMS Message</a>

	window.location = "/"; // redirect to home
}

function recommendationClicked(e) {
	window.location = "/detail";
}

function goBackClicked(e) {
	console.log("HERE!");
	window.location = "/"; // redirect to home
}

// <a href="sms:1-408-555-1212">New SMS Message</a>

function textClicked(e) {
	console.log("HERE!");
	console.log($("#user-number").html());
	//window.location = "sms:1-408-555-1212";
	//console.log(number);
}

function createRecommendationClicked(e) 
{
	window.location = "/recommendation";
}