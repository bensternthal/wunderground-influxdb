'use strict';

var conf = require('./lib/conf');
var Influx = require('./lib/influx');
var SlackBot = require('slackbots');
var WU = require('./lib/WU');

// Create & Configure Slackbot
var bot = new SlackBot({
    token: conf.get('slackbot:api_token'),
    name: 'wu-status'
});
var channel = conf.get('slackbot:channel');
var params = {icon_emoji: ':wu:'};

// Alert We have Started
bot.postMessageToGroup(channel, 'Weather Underground Has Started', params);

function getData() {
    WU.getWUData().then(Influx.writeInflux).then(function() {
        setTimeout(getData, conf.get('update_frequency'));
    }).catch(function(e) {
        bot.postMessageToGroup(channel,  'Error: ' + e.message);
        // Retry on error
        setTimeout(getData, conf.get('update_frequency'));
    });
};


//Delay 10 Seconds In Case of Flapping
setTimeout(function() {
    getData();
}, 10000);
