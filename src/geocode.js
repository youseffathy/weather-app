const chalk = require("chalk");
const request = require("request");

/* weather app with callback version */

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?limit=1&access_token=pk.eyJ1IjoieW91c2VmZmF0aHk3NjAiLCJhIjoiY2tlZm5pbWxhMWRhYTJzcnZuY293N2JoNCJ9.bsmA4uIXl7cuP8mInVHFpQ";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.success == false) {
      callback("Unable to find location!!", undefined);
    } else if (body.features.length === 0) {
      callback("Invalid location!!", undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const placeName = body.features[0].place_name;
      const location = { latitude, longitude, placeName };
      callback(undefined, location);
    }
  });
};
module.exports = geocode;
