// Using a search option and the giphy API, make a page where you can search for a gif
// and have the word searched populate at the top and the gifs populate in the page
var topics = ["music", "hiking","cycling", "backpacking"];

function appendButtons (buttonTopics) {
  //remove what's displayed on page
  $("#button-area").empty();
  //display buttons on page
  for(var i = 0; i < buttonTopics.length; i++) {
    //create new button
    var newButton = $("<button type='button' class='btn btn-secondary btn-md'>");
    //add text to display
    newButton.text(buttonTopics[i]);
    //add class
    newButton.addClass("btn-attr");

    //add data attribute
    newButton.attr("data-topic", buttonTopics[i]);
    //append to page
    $("#button-area").append(newButton);
  }
}

appendButtons(topics);

function addClickHandler () {
  //adding click event listener to all buttons
  $(".btn-attr").on("click", function() {

  //grabbing and storing data-topic property from button
    var originalTopic = $(this).attr("data-topic");
  //An array of strings with topics

    searchAndDisplay(originalTopic);

  });
}

addClickHandler();

//Run search function
$("#run-search").on("click", function(event) {
  //prevents refresh
  event.preventDefault();

  //create variable to store what is put into search
  var searchTopic = $("#search-term").val().trim();

  console.log(searchTopic);

  //uses function below
  searchAndDisplay (searchTopic);

  //append button to page
  topics.push(searchTopic);

  //run appendButtons function using topics array
  appendButtons(topics);

  addClickHandler();

});

function searchAndDisplay (topics) {
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
          topics + "&api_key=dc6zaTOxFJmzC&limit=10";

    //Performing ajax request with queryURL
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(queryUrl);
      console.log(response);
    //call query/ajax function request
      

      //Store data from ajax request in the results var
      var results = response.data;

      //take topics from array, create buttons in html
      //using for loop to append a button for each string
        for (var i = 0; i < results.length; i++) {

          //creating a div for the gif
          var gifDiv = $("<div>");

          //storing the result item's rating
          var rating = results[i].rating;

          //creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          //creating an image tag
          var topicImage = $("<img class='gif'>");

          //giving the image tag an src attribute of a property
          //pulled off the result item
          topicImage.attr("src", results[i].images.fixed_height_still.url);

          //appending the paragraph and topicImage we created to the gifDiv
          gifDiv.append(p);
          gifDiv.append(topicImage);

          //prepending the gifDiv to the #gifsgohere div
          $("#gifsgohere").prepend(gifDiv);

        };
    });
}


$('body').on('click', '.gif', function() {
          var src = $(this).attr("src");
            if($(this).hasClass('playing')){
              //stop
              $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
              $(this).removeClass('playing');
            } else {
              //play
              $(this).addClass('playing');
              $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
            }
        });
  

