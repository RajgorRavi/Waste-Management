// import { waypoints } from './updateWaypoints.js';
function showMapRoutes(){
  

const map = L.map("map").setView(
  [22.307145395923598, 73.1811886407189],
  12
);

// Set up the tile layer from OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Define the start and end points
const start = [22.310955190366208, 73.18085239471678]; // Example start point
// const waypoints = [
//   [22.299972255173422, 73.19476546818068],
//   [22.30040663847623, 73.22029056434957],
//   [22.300767, 73.229922],
//   [22.30394418047043, 73.2053375873327]
// ];
const end = [22.304558320961764, 73.25028846420463]; // Example end point

// Add markers for the start point, waypoints, and end point
L.marker(start).addTo(map).bindPopup("Start Point").openPopup();
waypoints.forEach((waypoint, index) => {
  L.marker(waypoint)
    .addTo(map)
    .bindPopup(`Waypoint ${index + 1}`);
});
L.marker(end).addTo(map).bindPopup("End Point").openPopup();

const coordinates = [start, ...waypoints, end];
let currentWaypointIndex = 0;
let currentRouteLayer = null;

function updateRoute() {
  if (currentWaypointIndex < waypoints.length) {
    const formattedCoordinates = [
      start,
      ...waypoints.slice(0, currentWaypointIndex + 1),
      end,
    ];
    const coordinatesForRoute = [
      formattedCoordinates[currentWaypointIndex],
      formattedCoordinates[currentWaypointIndex + 1],
    ];

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248a7cec9c9c64245e080943300fb6942f4&start=${coordinatesForRoute[0][1]},${coordinatesForRoute[0][0]}&end=${coordinatesForRoute[1][1]},${coordinatesForRoute[1][0]}`;

    // Call the OpenRouteService API using GET method
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Log the response data for debugging
        console.log("API Response:", data);

        if (data.features && data.features.length > 0) {
          const route = data.features[0].geometry;

          if (currentRouteLayer) {
            map.removeLayer(currentRouteLayer);
          }

          // Create a Leaflet GeoJSON layer to display the route
          currentRouteLayer = L.geoJSON(route, {
            style: {
              color: "green",
              weight: 5,
            },
          }).addTo(map);

          // Fit the map view to the route
          const bounds = L.geoJSON(route).getBounds();
          map.fitBounds(bounds);
        }
      })
      .catch((err) => console.error("Fetch error:", err));

    currentWaypointIndex++;
  } else {
   alert("No more waypoints");
  }
}

document
  .getElementById("nextButton")
  .addEventListener("click", updateRoute);

// Initialize the route display with the first waypoint
updateRoute();

}
showMapRoutes();