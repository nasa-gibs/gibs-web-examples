/**
 * GIBS Web Examples
 *
 * Copyright 2013 - 2014 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

$(function() {

    // Seven day slider based off today, remember what today is
    var today = new Date();

    // Selected day to show on the map
    var day = new Date(today.getTime());

    // When the day is changed, cache previous layers. This allows already
    // loaded tiles to be used when revisiting a day. Since this is a
    // simple example, layers never "expire" from the cache.
    var cache = {};

    // GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
    // Date.toISOString returns YYYY-MM-DDTHH:MM:SSZ. Split at the "T" and
    // take the date which is the first part.
    var dayParameter = function() {
        return day.toISOString().split("T")[0];
    };

    var map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:4326",
        numZoomLevels: 9,
    });

    var update = function() {
        // Using the day as the cache key, see if the layer is already
        // in the cache.
        var key = dayParameter();
        var layer = cache[key];

        // If not, create a new layer and add it to the cache.
        if ( !layer ) {
            layer = createLayer();
            cache[key] = layer;
        }

        // There is only one layer in this example, but remove them all
        // anyway
        clearLayers();

        // Add the new layer for the selected time
        map.addLayer(layer);

        // Update the day label
        $("#day-label").html(dayParameter());
    };

    var clearLayers = function() {
        // Get a copy of the current layer list and then remove each
        // layer.
        var activeLayers = map.layers.slice(0);
        for ( var i = 0; i < activeLayers.length; i++ ) {
            map.removeLayer(activeLayers[i]);
        }
    };

    var createLayer = function() {
        layer = new OpenLayers.Layer.WMTS({
            name: "Terra / MODIS Corrected Reflectance (True Color)",
            url: [
                "//map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi",
                "//map1b.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi",
                "//map1c.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi"
            ],
            layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
            style: "",
            matrixSet: "EPSG4326_250m",
            maxResolution: 0.5625,
            numZoomLevels: 9,
            tileSize: new OpenLayers.Size(512, 512),
            format: "image/jpeg",
            projection: "EPSG:4326",
            attribution:
                "<a href='http://openlayers.org/two'>" +
                "OpenLayers</a>" +
                "<a href='https://wiki.earthdata.nasa.gov/display/GIBS'>" +
                "NASA EOSDIS GIBS</a>" +
                "<a href='https://github.com/nasa-gibs/web-examples/blob/release/examples/openlayers2/time.js'>" +
                "View Source" +
                "</a>"
        });
        layer.mergeNewParams({time: dayParameter()});

        return layer;
    };

    update();
    map.setCenter([0, 0], 2);

    // Slider values are in "days from present".
    $("#day-slider").slider({
        value: 0,
        min: -6,
        max: 0,
        step: 1,
        slide: function(event, ui) {
            // Add the slider value (effectively subracting) to today's
            // date.
            var newDay = new Date(today.getTime());
            newDay.setUTCDate(today.getUTCDate() + ui.value);
            day = newDay;
            update();
        }
    });
});
