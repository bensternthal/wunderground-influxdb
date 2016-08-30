'use strict';

var conf = require('./lib/conf');
var Wunderground = require('wundergroundnode');
var Influx = require('./lib/influx');
var SlackBot = require('slackbots');


// Create & Configure Slackbot
var bot = new SlackBot({
    token: conf.get('slackbot:api_token'),
    name: 'wu-status'
});
var channel = conf.get('slackbot:channel');
var params = {icon_emoji: ':wu:'};


// Create & configure wunderground
var wunderground = new Wunderground(conf.get('wunderground_key'));

bot.postMessageToGroup(channel, 'Weather Underground Has Started', params);


function getData() {
    wunderground.conditions().request('97214', function(err, response){
        var wuJSON = {};

        if(err) {
            bot.postMessageToGroup(channel, 'Error!' + err, params);
            console.log(err);
            process.exit(1);
        }

        wuJSON['current_temperature'] = response.current_observation.temp_c;
        wuJSON['current_humidity'] = parseInt(response.current_observation.relative_humidity);

        Influx.writeInflux(wuJSON);
        setTimeout(getData, 300000);
    });
};

getData();
