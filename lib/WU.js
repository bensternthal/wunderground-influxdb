require('dotenv').config();
let Wunderground = require('wundergroundnode');

// Create & configure wunderground
const wunder = new Wunderground(process.env.WUNDERGROUND_KEY);
const zip = process.env.ZIP_CODE;

let wuJSON = {};

exports.getWUData = function() {
    return new Promise(function(resolve, reject) {
        wunder.conditions().request(zip, function(err, response) {
            if(err) {
                return reject(new Error(err));
            }

            if(response.response.error) {
                return reject(new Error(response.response.error.type));
            }

            wuJSON['current_temperature'] = response.current_observation.temp_c;
            wuJSON['current_humidity'] = parseInt(response.current_observation.relative_humidity);
            wuJSON['pressure_mb'] = response.current_observation.pressure_mb;

            // We Have Vaid JSON  Data
            resolve(wuJSON);
        });
    });
};
