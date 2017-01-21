var Slack = require('slack-node');
var express = require('express');
var url = require('url');
var app = express();
// var weather = require('weather-js');
var axios = require('axios');
var unirest = require('unirest');


/*
This BOT allows you to ask it for help and you can look up movies from the OMDB database and you can also get inspirational/famous quotes
 */

////////////// THE SETUP ///////////////////////////////////////////

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'))

app.get('/', function (request, response) {

    var urlObject = url.parse(request.url, true).query
    console.log(urlObject);
    sendMessage(urlObject);

});



///////////// THE SEND MESSAGE //////////////////////////////////////////
// ===============Original FUNCTION ===========
function sendMessage(urlObject) {

    slack = new Slack();
    slack.setWebhook(urlObject.response_url);

    //This splits up the user input so you can handle multiple words
    var userText = urlObject.text.split(" ");
    //This will be the command to direct what the output will be
    var userCommand = userText[0];
    //This will be the second user command and will be the input that is evaluated
    var userInput = userText[1];

    var responseText = "";

    switch(userCommand.toLowerCase()){
        case "help":

            slack.webhook({
                channel: urlObject.channel_name,

                text: "You can type the following commands:\n 1. `movie` and your `MOVIENAME` like `/nigel movie sandlot` and this will return your movie information or; \n2. `quote` and then a `genre` like `/nigel quote movies` and it will return a quote"
            }, function (err, response) {
                if (err) {
                    console.log(err)
                }
            });
            break;
        case "movie":
            //use axios to perform a movie search on the imdb database
            // var queryURL = "http://imdb.wemakesites.net/api/search?q="+userInput+"&api_key=909eddb2-f52d-475e-892c-4020a43d002e";
            // axios.get(queryURL).then(function (response) {
            //     console.log(response.body);
            //     responseText = "Your Movie title is: " + response.term;
            //     slack.webhook({
            //         channel: urlObject.channel_name,
            //
            //         text: response.term
            //     }, function (err, response) {
            //         if (err) {
            //             console.log(err)
            //         }
            //     });
            //
            // })
            //
            // break;
        case "quote":


            // These code snippets use an open-source library. http://unirest.io/nodejs
            unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat="+userInput)
                .header("X-Mashape-Key", "pDAmhnhyqrmshud5Z7fQ0MxQcWy3p1iEYQYjsnnyqHx50eTQdx")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "application/json")
                .end(function (result) {
                    console.log(result.status, result.headers, result.body);
                    responseText = result.body;
                    slack.webhook({
                        channel: urlObject.channel_name,

                        text: responseText
                    }, function (err, response) {
                        if (err) {
                            console.log(err)
                        }
                    });

                });



            break;
        default:
            responseText = "Sorry unrecognized command, type `/nigel help` for a list of possible commands"
    }

    slack.webhook({
        channel: urlObject.channel_name,

        text: responseText
    }, function (err, response) {
        if (err) {
            console.log(err)
        }
    });
}

