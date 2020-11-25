// JavaScript Document// quotes are stored in an array of objects
var quotes = [{
  "quote": "'We listen, we believe'"
}, {
  "quote": "'One day at a time'", 
}, {
  "quote": "'it's not your fault, you are worthy'"
}, {
  "quote": "'If it feels too heavy, put it down'"
}, {
  "quote": "'We are complicated beings and that is okay'"
}, { 
}];

// function to load and display a new quote
function newQuote() {
  var quoteID = Math.floor(Math.random() * (quotes.length));
  $("#insertQuote").html(quotes[quoteID].quote);
	return quotes[quoteID].quote
}

function openWindow(quote) {
	var tweetUrl = "https://twitter.com/intent/tweet?&text=" + encodeURIComponent("'" + quote + "'\n-Trivial Disappointment (@TrivialDis)")
	window.open(tweetUrl, "_blank"); //allows users to tweet the quote shown on the main page from a new tab
}

// wait for page load before displaying content
$(document).ready(function() {
  // load an initial quote
  var chosenQuote = newQuote();

	$('#insertQuote').click(function() {

	  openWindow(chosenQuote)

	}); 

});