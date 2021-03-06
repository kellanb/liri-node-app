# LIRI

## About
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## What it does
### Concerts
node liri.js concert-this <artist/band name here>

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal/bash window:
* Name of the venue
* Venue location
* Date of the Event

![](images/concert-terminal.JPG)

It will also append the results into the log.txt file

![](images/concert-log.JPG)

### Spotify
node liri.js spotify-this-song <insert song title>

This will show the following information about the song in your terminal/bash window:
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from
If no song is provided then your program will default to "Learning to Fly" by Tom Petty

![](images/spotify-terminal.JPG)

It will also append the results into the log.txt file

![](images/spotify-log.JPG)

### Movies
node liri.js movie-this <insert movie title>

This will output the following information to your terminal/bash window:
* Title of the movie.
* Release date
* IMDB rating
* Rotten tomatoes rating
* Country
* Language
* Plot
* Actors

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

![](images/movie-terminal.JPG)

It will also append the results into the log.txt file

![](images/movie-log.JPG)

### Do What It Says
node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

Right now it will run spotify-this-song for "I Want it That Way,".

![](images/dowhatitsays-terminal.JPG)

![](images/dowhatitsays-log.JPG)
