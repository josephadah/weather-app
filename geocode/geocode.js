const request = require("request");

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURI(address);

  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_API}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to google server.");
      } else if (body && body.status === "ZERO_RESULTS") {
        callback("Address not found.");
      } else if (body && body.status === "OK") {
        callback(undefined, {
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        });
      }
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;
