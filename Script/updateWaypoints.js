// updateWaypoint.js
const axios = require('axios');

const apiKey = '5b3ce3597851110001cf6248a7cec9c9c64245e080943300fb6942f4';
const waypoints = [
  [22.299972255173422, 73.19476546818068],
  [22.30040663847623, 73.22029056434957],
  [22.300767, 73.229922],
  [22.30394418047043, 73.2053375873327]
];

async function getCoordinates(placeName) {
  try {
    const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
      params: {
        api_key: apiKey,
        text: placeName,
        size: 1  // Return only the top result
      }
    });

    const features = response.data.features;
    if (features && features.length > 0) {
      const coordinates = features[0].geometry.coordinates;  // [longitude, latitude]
      console.log(`Coordinates for ${placeName}: Longitude: ${coordinates[0]}, Latitude: ${coordinates[1]}`);
      
      // Add the coordinates to the waypoints array
      waypoints.push([coordinates[1], coordinates[0]]); // Push in [latitude, longitude] format
      console.log('Updated waypoints:', waypoints);
      
    } else {
      console.log(`No coordinates found for ${placeName}`);
    }
  } catch (error) {
    console.error(`Error fetching coordinates: ${error}`);
  }
}

 getCoordinates("Gujarat");

 function getWaypoints() {
  return waypoints;
}
module.exports = { waypoints };
