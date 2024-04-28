# leaflet-challenge

Written by: Tristan Perry

This project contains a JavaScript source code (logic.js) that connects to earthquake data using d3 from https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson. 
Data is pulled in JSON format from this source, and used to create an interactive visualization of earthquakes reported from the last week. OpenStreetMap is used to add map tile layers, and locations for each earthquake point are placed on the map. Size and color of each point vary based on the depth and magnitude attributed to them. Relating information for each data point appears when a point is clicked by the user.  