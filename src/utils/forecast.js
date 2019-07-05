const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/070f7ff8e08c0675749a0794e25fe779/${encodeURIComponent(
    lat
  )},${encodeURIComponent(long)}?units=si&lang=en`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find this coordinate", undefined);
    } else {
      const forecastString = `${body.daily.data[0].summary} It is currently ${
        body.currently.temperature
      } °C. There is a ${body.currently.precipProbability}% chance of rain.`;
      callback(undefined, forecastString);
    }
  });
};

module.exports = forecast;
