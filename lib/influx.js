'use strict';

/* Influx! */
var influx = require('influx');
var conf = require('./conf');

var client = influx({
    // or single-host configuration
    host: conf.get('influx_host'),
    port: conf.get('influx_port'),
    protocol: 'http',
    username: conf.get('influx_username'),
    password: conf.get('influx_password'),
    database: conf.get('influx_db')
});


exports.writeInflux = function(wuJSON) {
    var points = [
        [{
            'temperature': wuJSON.current_temperature
        }, {
            location: '97214'
        }],
        [{
            'humidity': wuJSON.current_humidity
        }, {
            location: '97214'
        }],
        [{
            'pressure_mb': wuJSON.pressure_mb
        }, {
            location: '97214'
        }]
    ];

    client.writePoints('weather.wunderground', points, function(err, response) {
        if (err) {
            console.log(err);
        }
    });

};
