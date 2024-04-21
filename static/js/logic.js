// Create the map
var map = L.map('map').setView([0, 0], 2);

// Add tile layer from OpenStreetMap 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Grabbing data from URL, this JSON is for all earthquakes last 7 days
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // Function that alters the size and color of markers based on magnitude and depth
    function markerProperties(magnitude, depth) {
        var markerSize = magnitude * 3; 
        var color = depth > 70 ? 'red' : depth > 30 ? 'orange' : depth > 10 ? 'yellow' : 'green';
        return { size: markerSize, color: color };
    }

    // Add the markers to map with popups on click
    data.features.forEach(function(feature) {
        var magnitude = feature.properties.mag;
        var depth = feature.geometry.coordinates[2];
        var lat = feature.geometry.coordinates[1];
        var lon = feature.geometry.coordinates[0];

        var properties = markerProperties(magnitude, depth);

        var marker = L.circleMarker([lat, lon], {
            radius: properties.size,
            fillColor: properties.color,
            color: properties.color,
            fillOpacity: 0.6
        }).bindPopup("<b>Location:</b> " + feature.properties.place + "<br><b>Magnitude:</b> " + magnitude + "<br><b>Depth:</b> " + depth + " km").addTo(map);
    });

    // Add a legend to display relevant info
    var legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<b>Legend</b><br>';
        div.innerHTML += '<i style="background: green"></i> Depth &lt; 10 km<br>';
        div.innerHTML += '<i style="background: yellow"></i> 10 km &le; Depth &lt; 30 km<br>';
        div.innerHTML += '<i style="background: orange"></i> 30 km &le; Depth &lt; 70 km<br>';
        div.innerHTML += '<i style="background: red"></i> Depth &ge; 70 km<br>';
        return div;
    };

    legend.addTo(map);
});