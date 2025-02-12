const map = L.map("map").setView(
  [22.307145395923598, 73.1811886407189],
  12
);

// Set up the tile layer from OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Define the red icon
const redIcon = L.icon({
  iconUrl: 'https://as1.ftcdn.net/v2/jpg/05/32/76/92/1000_F_532769254_D0HeEQWOFsuqzMc60JXSZL5DcMBUkCNj.webp', // URL of the red icon image
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34] // Popup anchor
});

// Define the start point
const start = [22.310955190366208, 73.18085239471678]; // Example start point

// Define the first waypoint
const waypoints = [
  [22.299972255173422, 73.19476546818068],
  [22.30040663847623, 73.22029056434957],
  [22.300767, 73.229922]
];

// Define the end point
const end = [22.304558320961764, 73.25028846420463]; // Example end point

// Add markers for the start point and the first waypoint with the red icon
L.marker(start, { icon: redIcon }).addTo(map).bindPopup("Start Point").openPopup();

waypoints.forEach((waypoint, index) => {
  L.marker(waypoint, { icon: redIcon })
    .addTo(map)
    .bindPopup(`Waypoint ${index + 1}`);
});

L.marker(end, { icon: redIcon }).addTo(map).bindPopup("End Point").openPopup();

const coordinates = [start, ...waypoints, end];
let currentWaypointIndex = 0;
let currentRouteLayer = null;

function updateRoute() {
  if (currentWaypointIndex < waypoints.length+1) {
    const nextEndpoint = waypoints[currentWaypointIndex];
    const formattedCoordinates = [
      start,
      ...waypoints.slice(0, currentWaypointIndex + 1),
      end,
    ];
    const coordinatesForRoute = [
      formattedCoordinates[currentWaypointIndex],
      formattedCoordinates[currentWaypointIndex + 1],
    ];

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248a7cec9c9c64245e080943300fb6942f4&start=${coordinatesForRoute[0][1]},${coordinatesForRoute[0][0]}&end=${coordinatesForRoute[1][1]},${waypoints[1][0]}`;

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
              color: "blue",
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
