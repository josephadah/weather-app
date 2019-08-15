console.log('starting weather app ....');
require('custom-env').env();
const axios = require('axios');
const yargs = require('yargs');

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

const encodedAddress = encodeURI(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_API}`;
axios.get(geocodeUrl).then((response) => {
    if (response.status !== 200) {
        throw new Error('Unable to fetch address');
    }

    console.log(`Weather for address: ${response.data.results[0].geometry.location.lat}.`);
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    
    weatherUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_WEATHER_API}/${lat},${lng}?units=si`;
    return axios(weatherUrl);
}).then((response) => {
    if (response.status === 200) {
        console.log(`The temperature is: ${response.data.currently.temperature} C, but it feels like ${response.data.currently.apparentTemperature}.`);
    }
}).catch((error) => {
    console.log(error.message);
});

