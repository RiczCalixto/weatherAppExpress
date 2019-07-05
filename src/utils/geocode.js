const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicnNreSIsImEiOiJjanhnd3BmMXIwODdsM3htdjRlMTFrb2M0In0.cu6PXNO4Y1U3aKExZZzF6A`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to find location", undefined);
    } else if (body.features.length === 0) {
      callback("Please try again, unavailable locale to search", undefined);
    } else {
      const lat = body.features[0].geometry.coordinates[1];
      const long = body.features[0].geometry.coordinates[0];
      const placeName = body.features[0].place_name;
      callback(undefined, {
        latitude: lat,
        longitude: long,
        placeName: placeName
      });
    }
  });
};

module.exports = geocode;
