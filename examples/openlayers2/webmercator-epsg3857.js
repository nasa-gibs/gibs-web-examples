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

window.onload = function() {

    var map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:3857",
        numZoomLevels: 9
    });

    var layer = new OpenLayers.Layer.WMTS({
        name: "Terra / MODIS Corrected Reflectance (True Color)",
        url: [
            "//map1a.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi",
            "//map1b.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi",
            "//map1c.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi"
        ],
        layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
        style: "",
        matrixSet: "GoogleMapsCompatible_Level9",
        maxResolution: 156543.03390625,
        numZoomLevels: 9,
        maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
        tileSize: new OpenLayers.Size(256, 256),
        format: "image/jpeg",
        projection: "EPSG:3857",
        attribution:
            "<a href='http://openlayers.org/two'>" +
            "OpenLayers</a>" +
            "<a href='https://wiki.earthdata.nasa.gov/display/GIBS'>" +
            "NASA EOSDIS GIBS</a>" +
            "<a href='https://github.com/nasa-gibs/web-examples/blob/release/examples/openlayers2/webmercator-epsg3857.js'>" +
            "View Source" +
            "</a>"
    });
    layer.mergeNewParams({time: "2013-06-15"});

    map.addLayer(layer);
    map.setCenter([0, 0], 3);
};
