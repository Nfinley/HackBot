var Slack = require('slack-node');
var express = require('express');
var url = require('url');
var app = express();
var weather = require('weather');

// weather({location: 'Melbourne'}, function(data) {
//     if (data.temp > 30) {
//         console.log("Damn it's hot!");
//     }
// });

// TODO: Add Weather and Location

////////////// THE SETUP ///////////////////////////////////////////

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'))

app.get('/', function (request, response) {

    var urlObject = url.parse(request.url, true).query
    console.log(urlObject);
    console.log(urlObject);
    var weather = getWeather();
    sendMessage(weather);


});

function getWeather() {
    weather({location: 'Austin'}, function (data) {
        return data;
    });
}

///////////// THE SEND MESSAGE //////////////////////////////////////////
//===============Original FUNCTION ===========
function sendMessage(urlObject) {

    slack = new Slack();
    slack.setWebhook(urlObject.response_url);
    getLocation();
    //   /mySlashCommand catfish    'catfish' is stored in var userCommand
    var userText = urlObject.text;

    slack.webhook({
        channel: urlObject.channel_name,

        text: "you typed: " + userText                  // the response back to slack
    }, function (err, response) {
        if (err) {
            console.log(err)
        }
    });
}

function getLocation() {
    if (userText === "My Location") {
        text: "Your location is XYZ";
    }
}
// function getLocation(urlObject){
//     slack = new Slack();
//     slack.setWebhook(urlObject.response_url);
//
//     //   /mySlashCommand catfish    'catfish' is stored in var userCommand
//     var userText = urlObject.text;
//
//     slack.webhook({
//         channel: urlObject.channel_name,
//         if (userText == "My Location"){
//         // the response back to slack
//         text: "Your location is XYZ"
//
//     } else {
//             text: "To see your location please type 'My Location' "
//     };
//
//
//     }, function(err, response) {
//         if (err){
//             console.log(err)
//         }
//     });
//
// }

/////////////////////////////////////////////////////////
