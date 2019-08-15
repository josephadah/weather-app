console.log('starting weather app ....');
require('custom-env').env();
const weather = require('./weather/weather');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address', 
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;



geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`Weather for Address: ${result.address} ...`);
        weather.getWeather(result.lat, result.lng, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`The Temperature is: ${weatherResult.temperature} C, but it feels like ${weatherResult.apparentTemperature} C`);
            }
        });
    }
});

