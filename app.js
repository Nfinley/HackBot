var Slack = require('slack-node');
var express = require('express');
var url = require('url');
var app = express();
var weather = require('weather-js');


// TODO: Create bot that uses omdb to look up a movie

////////////// THE SETUP ///////////////////////////////////////////

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'))

app.get('/', function (request, response) {

    var urlObject = url.parse(request.url, true).query
    console.log(urlObject);
    testWeather(urlObject);
    // sendMessage(urlObject);



});


function testWeather(urlObject) {
    weather.find({search: 'Austin, TX', degreeType: 'F'}, function (err, result) {
        if(err) console.log(err);
        console.log(result);
        console.log(result[0].location.name);
        console.log(result[0].location.current.temperature);
        var locationName = result[0].location.name;
        var temp = result[0].location.current.temperature;
        // sendMessage(urlObject, locationName, temp);
    });
}
///////////// THE SEND MESSAGE //////////////////////////////////////////
// ===============Original FUNCTION ===========
function sendMessage(urlObject, data, temp) {

    slack = new Slack();
    slack.setWebhook(urlObject.response_url);

    //This splits up the user input so you can handle multiple words
    var userText = urlObject.text.split(" ");
    // //This will be the command to direct what the output will be
    // var userCommand = userText[0];
    // //This will be the second user command and will be the input that is evaluated
    // var userInput = userText[1];


    slack.webhook({
        channel: urlObject.channel_name,

        text: "You typed: " + userText + "And your location is: " +  data  + "and it is currently " + temp + " degrees"            // the response back to slack
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
