var Slack = require('slack-node');
var express = require('express');
var url = require('url');
var app = express();
// var weather = require('weather-js');
var axios = require('axios');
var unirest = require('unirest');


// TODO: Create bot that uses omdb to look up a movie

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

                text: "You can type the following commands:\n 1. `movie` and your `MOVIENAME` like `/nigel movie sandlot` and this will return your movie information\n or; 2. `quote` and then a `genre` like `/nigel quote movies` and it will return a quote"
            }, function (err, response) {
                if (err) {
                    console.log(err)
                }
            });
            break;
        // case "movie":
        //     //use axios to perform a movie search on the omdb database
        //
        //     axios.get
        //     slack.webhook({
        //         channel: urlObject.channel_name,
        //
        //         text:
        //     }, function (err, response) {
        //         if (err) {
        //             console.log(err)
        //         }
        //     });
        //     break;
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



//======= CHANCE APPP =======


/////////////// THE SEND MESSAGE //////////////////////////////////////////

    // function chuckNorris(urlObject){
    //
    //     const slack = new Slack();
    //     slack.setWebhook(urlObject.response_url);
    //
    //     //   /mySlashCommand catfish    'catfish' is stored in const userCommand
    //     request('http://api.icndb.com/jokes/random?firstName=Chuck&lastName=Norris', function (error, resp, body) {
    //         const joke = JSON.parse(body);
    //
    //
    //         slack.webhook({
    //             channel: urlObject.channel_name,
    //             text: joke.value.joke
    //         }, function(err, resp) {
    //             if (err){
    //                 console.log(err)
    //             }
    //         })//webhook
    //     })
    // }
    //

    //======== END CHANCE APPP ========

//====== MIKE APPP ===========


/////////////// THE SEND MESSAGE //////////////////////////////////////////
//     function sendVideo(urlObject) {
//         var query = urlObject.text;
//
//         request('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+ query +'&type=video&key=AIzaSyAPF280wWDUXe8i6RdW8gQ3_RnQMOP4BXk', function(error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log("Response: ", response.body.type)
//                 var object = JSON.parse(response.body);
//                 var baseURL = 'https://www.youtube.com/watch?v=';
//                 var videoURL = baseURL + object.items[0].id.videoId
//
//                 slack = new Slack();
//                 slack.setWebhook(urlObject.response_url);
//
//                 slack.webhook({
//                     channel: urlObject.channel_name,
//
//                     text: videoURL
//                     attachment: {
//                         title_link: videoURL
//                     }
//
//                 }, function(err, response) {
//                     if (err) {
//                         console.log(err)
//                     }
//                 });
//             }
//         })
//     }

 //END
