// An array that contains all the information needed to create city and state markers
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMap);

function getColor(depth) {
    if(depth < 20)
        return 'green'
    else if(depth < 40)
        return 'chartreuse'
    else if(depth < 60)
        return 'yellow'
    else if(depth < 80)
        return 'orange'
    else 
        return 'red'
}

function createMap(locations) {
    // Define arrays to hold the created city and state markers.
    var earthquake = [];

    console.log(locations)
    console.log(locations.features.length)

    // Loop through locations, and create the city and state markers.
    for (var i = 0; i < locations.features.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        
        latLon = locations.features[i].geometry.coordinates.slice(0,2).reverse()
        depth = locations.features[i].geometry.coordinates[2]
        mag = locations.features[i].properties.mag

        // console.log(latLon)
        // console.log(depth)

        earthquake.push(
        L.circle(latLon, {
            stroke: false,
            fillOpacity: 0.75,
            color: getColor(depth),
            // fillColor: "red",
            radius: mag * 20000
        })
        );


    }

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create two separate layer groups: one for the city markers and another for the state markers.
    var quakes = L.layerGroup(earthquake);


    // Create a baseMaps object.
    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    // Create an overlay object.
    var overlayMaps = {
        "Earthquakes": quakes,
    };

    // Define a map object.
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, quakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend = L.control({ position: "bottomleft" });

    legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Depth</h4>";
    div.innerHTML += '<i style="background: green"></i><span> < 20</span><br>';
    div.innerHTML += '<i style="background: chartreuse"></i><span> 20 < 40</span><br>';
    div.innerHTML += '<i style="background: yellow"></i><span>40 < 60</span><br>';
    div.innerHTML += '<i style="background: orange"></i><span>60 < 80</span><br>';
    div.innerHTML += '<i style="background: red"></i><span>80+</span><br>';
    



    return div;
};

legend.addTo(myMap);

}

/*Setup*/
// var map = L.map("mapid").setView([55.67, 12.57], 7);
// L.tileLayer(
//     "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
// ).addTo(map);

/*Legend specific*/




// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
