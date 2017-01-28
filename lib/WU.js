'option strict';

var util = require('util');
var Wunderground = require('wundergroundnode');
var conf = require('./conf');

// Create & configure wunderground
const WUNDER = new Wunderground(conf.get('wunderground_key'));
var wuJSON = {};

exports.getWUData = function() {

    return new Promise(function(resolve, reject) {

        WUNDER.conditions().request('97214', function(err, response){
            if(err) {
                return reject(new Error(err));
            }

            if(response.response.error) {
                return reject(new Error(response.response.error.type));
            }

            wuJSON['current_temperature'] = response.current_observation.temp_cbidd;
            wuJSON['current_humidity'] = parseInt(response.current_observation.relative_humidity);
            wuJSON['pressure_mb'] = response.current_observation.pressure_mb;

            //We Have Vaid JSON  Data
            resolve(wuJSON);

        });

    });
};
