'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	$(".submitbutton").click(submitRecommendationClicked);
	$("#recommendation-navigation .left-button").click(goBackClicked);
	$("#detail-navigation .left-button").click(goBackClicked);
	$("#index-navigation .right-button").click(createRecommendationClicked);
	$(".recommendation").click(recommendationClicked);

}


function submitRecommendationClicked(e) {
	e.preventDefault();
	window.location = "/"; // redirect to home
}

function recommendationClicked(e) {
	window.location = "/detail";
}

function goBackClicked(e) {
	console.log("HERE!");
	window.location = "/"; // redirect to home
}

function createRecommendationClicked(e) 
{
	window.location = "/recommendation";
}