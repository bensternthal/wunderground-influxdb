require('dotenv').config();
let influx = require('influx');

let client = influx({
    host: process.env.INFLUX_HOST,
    port: process.env.INFLUX_PORT,
    protocol: 'http',
    username: process.env.INFLUX_USERNAME,
    password: process.env.INFLUX_PASSWORD,
    database: process.env.INFLUX_DB,
});

const zip = process.env.ZIP_CODE;

exports.writeInflux = function(wuJSON) {
    return new Promise(function(resolve, reject) {
        let points = [
            [{
                'temperature': wuJSON.current_temperature,
            }, {
                location: zip,
            }],
            [{
                'humidity': wuJSON.current_humidity,
            }, {
                location: zip,
            }],
            [{
                'pressure_mb': wuJSON.pressure_mb,
            }, {
                location: zip,
            }],
        ];

        client.writePoints('weather.wunderground', points, function(err, response) {
            if (err) {
                return reject(new Error(err));
            } else {
                resolve();
            }
        });
    });
};
