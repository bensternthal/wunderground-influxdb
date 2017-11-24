
## About

This small node script pulls information from wunderground and pushes to infuxdb.
It uses slack to notify of errors.

I use this to show outside conditions on my home weather monitoring dashboard.

![Grafana](/grafana.png)


## Wunderground Data

Bot pulls the following data for the zip specified.

1. current_temperature
1. current_humidity
1. pressure_mb


## Install

1. `npm install`
1. Copy `env.dist` to `.env`
1. Populate `.env` with the correct values.
1. Run with ```node app.js``` or for _production_ use pm2 or similar.

## Example Configuration

```
INFLUX_HOST=host.com
INFLUX_PORT=8086
INFLUX_USERNAME=weather
INFLUX_PASSWORD=foobar
INFLUX_DB=highgarden
SLACK_API_TOKEN=foobar
SLACK_CHANNEL=bots
SLACK_BOT_NAME=wu-status
WUNDERGROUND_KEY=foobar
UPDATE_FREQUENCY=1800000
ZIP_CODE=97214
```

## InfluxDB Data

To see what data and how it is written to influxdb, see ```lib/influx.js```.


## SlackBot

If you do not want to use slack for notifications just comment out the bot lines in app.js.


