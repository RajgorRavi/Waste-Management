const map = L.map('map').setView([22.307145395923598, 73.1811886407189], 12);

    // Set up the tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define the start and end points
    const start = [22.307145395923598, 73.1811886407189]; // Example start point
    const end = [22.28957583093514, 73.23300154115331]; // Example end point

    // Define waypoints
    const waypoints = [
      [22.300182627023002, 73.2104792990635], 
      [22.30040663847623, 73.22029056434957],[22.299972255173422, 73.19476546818068],
      [22.30040663847623, 73.22029056434957],
      [22.300767, 73.229922]
    ]; // Example waypoints
    
    // Combine start, waypoints, and end into a single array
    const coordinates = [start, ...waypoints, end];

    // Add markers for the start, waypoints, and end points
    L.marker(start).addTo(map).bindPopup('Start Point').openPopup();
    L.marker(end).addTo(map).bindPopup('End Point').openPopup();

    waypoints.forEach((waypoint, index) => {
      L.marker(waypoint).addTo(map).bindPopup(`Waypoint ${index + 1}`);
    });

    // Prepare the coordinates for the API request
    const formattedCoordinates = coordinates.map(point => [point[1], point[0]]);
    
    

    // Call the OpenRouteService API
    fetch(`https://api.openrouteservice.org/v2/directions/driving-car`, {
      method: 'POST',
      headers: {
        'Authorization': '5b3ce3597851110001cf6248a7cec9c9c64245e080943300fb6942f4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates: formattedCoordinates
      })
    })
    .then(response => response.json())
    .then(data => {
      // Log the response data for debugging
      console.log('API Response:', data);

      if (data.features && data.features.length > 0) {
        const route = data.features[0].geometry;

        // Create a Leaflet GeoJSON layer to display the route
        L.geoJSON(route, {
          style: {
            color: 'blue',
            weight: 5
          }
        }).addTo(map);

        // Fit the map view to the route
        const bounds = L.geoJSON(route).getBounds();
        map.fitBounds(bounds);
      } else {
        console.error('No route data available');
      }
    })
    .catch(err => console.error('Fetch error:', err));