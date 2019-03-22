const request = require('request');

const geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURI(address);

    console.log(encodedAddress);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCXQAgIiy1m3MFeq7ZYn-k6EovbU_oGcUw`,
        json: true
    }, (error, response, body) => {
        console.log(error);
        console.log(JSON.stringify());
        if (error) {
            callback('Unable to connect to google server.');
        } else if (body.status === 'EMPTY_RESULTS') {
            callback('Address not found.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports.geocodeAddress = geocodeAddress;
