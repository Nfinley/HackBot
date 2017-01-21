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



////////////// THE SETUP ///////////////////////////////////////////

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'))

app.get('/', function(request, response) {

    var urlObject = url.parse(request.url,true).query
    console.log(urlObject)
    sendMessage(urlObject);

}); //app.get

// TODO: Add Weather and Location
///////////// THE SEND MESSAGE //////////////////////////////////////////
//===============Original FUNCTION ===========
function sendMessage(urlObject){

    slack = new Slack();
    slack.setWebhook(urlObject.response_url);

    //   /mySlashCommand catfish    'catfish' is stored in var userCommand
    var userText = urlObject.text;

    slack.webhook({
        channel: urlObject.channel_name,

        text: "you typed: " + userText                  // the response back to slack

    }, function(err, response) {
        if (err){
            console.log(err)
        }
    });
}

function getWeather(urlObject){
    slack = new Slack();
    slack.setWebhook(urlObject.response_url);

    //   /mySlashCommand catfish    'catfish' is stored in var userCommand
    var userText = urlObject.text;

    slack.webhook({
        channel: urlObject.channel_name,
        if (userText === "My Weather"){
        // the response back to slack
        text: "Would you like to see the weather? It is sunny and 75 Degrees"

    } else {
            text: "To see your weather please type 'My Weather' "
    };


    }, function(err, response) {
        if (err){
            console.log(err)
        }
    });

}

/////////////////////////////////////////////////////////
