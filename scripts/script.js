$(document).ready(function(){
  //get json
  getQuote();
  //event handler for new quote
  $('.new-quote').on('click',function(){
    getQuote();
  });
  
  //event handler for tweet
  $('.tweet').on('click',function(){
    var text1 = $('#text').text();
    var text2 = $('.quote-author').text();
    //alert(text1+" "+text2);
    var tweetUrl = "https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&text=" +text1+" "+text2;
    window.open(tweetUrl, "_blank");
  });
  
  
});

//getJson from external site
var getQuote = function(){
  $.getJSON("https://dl.dropbox.com/s/x4huwrf5jmywuho/quotes.json?dl=0", function(json){
    //need to use $.ajax call and set cache to false to use this
    //$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(json){
    //alert(getJsonLength(json));
    //get a random id number from the json object
    
      // Don't need to randomize because the api already chooses 1 randomly
    var randomQuoteId = Math.floor(Math.random() * (getJsonLength(json) + 1));
    //filter the object with the right id
    var newQuote = json.filter(function(val){
      return val.id === randomQuoteId;
    });
      
    //insert new quote to html
    changeQuote(newQuote);
    
});
}

//pass json then get length
var getJsonLength = function(json){
  var jsonArray = json.filter(function(val){
    return isNaN(val.id) === false;
  });
  return jsonArray.length;
}

//change quote and author values in html
var changeQuote = function(obj){
  obj.forEach(function(val){
    $('#text').html(val.content);
    //$('#text').html(val.content);
    $('.quote-author').html("- "+ val.title);
    //$('.quote-author').html("- "+ val.title);
  });
}