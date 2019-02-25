require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");

var search = process.argv[2]; //this is the search term that will be entered i.e. spotify-this-song or movie-this, etc.
var term = process.argv.slice(3).join(" "); //this will be what song or movie title you can enter to get the results
var divider = "\n------------------------------------------------------------\n\n";

//using a switch statement to run whatever(search) case is entered
switch (search) {
  case 'concert-this':
    concert(term);
    break;
  case 'spotify-this-song':
    spotify(term);
    break;
  case 'movie-this':
    movie(term);
    break;
  case 'do-what-it-says':
    dostuff();
    break;
}

function concert(term) {
  var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

  axios.get(URL).then(function (response) {
    // Place the response.data into a variable, jsonData.
    var jsonData = response.data[0];
    // console.log(jsonData); //allows me to see the object values

    var concertData = [
      "Artist(s): " + jsonData.lineup,
      "Name of Venue: " + jsonData.venue.name,
      "Venue Location: " + jsonData.venue.city + ', ' + jsonData.venue.region,
      "Date of Event: " + jsonData.datetime
    ].join("\n\n");

    fs.appendFile("log.txt", '          **Concerts**\n\n' + concertData + divider, function (err) {
      if (err) throw err;
      console.log(concertData);

    });
  });
}

function spotify(term) {
  var spotify = new Spotify(keys.spotify);
  if (!term) {
    term = 'Learning to Fly';
  }
  spotify.search({
    type: 'track',
    query: term
  }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }
    // console.log(data.tracks.items); //this returns the data object with
    var info = data.tracks.items; //store the object in the info variable
    var spotifyData = [
      'Artist(s): ' + info[0].artists[0].name,
      'Song Name: ' + info[0].name,
      'Preview Link: ' + info[0].preview_url,
      'Album: ' + info[0].album.name,
    ].join('\n\n')

    fs.appendFile("log.txt", '          **Spotify Songs**\n\n' + spotifyData + divider, function (err) {
      if (err) throw err;
      console.log(spotifyData);
    });

  });
}

function movie(term) {
  if (!term) {
    term = 'Mr. Nobody';
  }

  var URL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

  axios.get(URL).then(function (response) {
    // Place the response.data into a variable, jsonData.
    var jsonData = response.data;
    // console.log(jsonData); //allows me to see the object values

    var movieData = [
      "Title: " + jsonData.Title,
      "Release Date: " + jsonData.Released,
      "IMDB Rating: " + jsonData.Ratings[0].Value,
      "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
      "Country: " + jsonData.Country,
      "Language: " + jsonData.Language,
      "Plot: " + jsonData.Plot,
      "Actors: " + jsonData.Actors
    ].join("\n\n");

    fs.appendFile("log.txt", '          **Movies**\n\n' + movieData + divider, function (err) {
      if (err) throw err;
      console.log(movieData);

    });
  });

}

function dostuff() {
  fs.readFile('random.txt', 'utf8', function (error, data) {

    if (error) {
      console.log(error);
    }

    var array = data.split(',');
    console.log(array);

    if (array[0] === "spotify-this-song") {
      var pickSong = array[1].slice(1, -1);
      spotify(pickSong);
    }

  });
}