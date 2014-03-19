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

    var map = L.map("map", {
        center: [0, 0],
        zoom: 3,
        maxBounds: [
            [-120, -220],
            [120, 220]
        ]
    });

    var template =
        "https://map1{s}.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi" +
        "?SERVICE=WMTS" +
        "&REQUEST=GetTile" +
        "&VERSION=1.0.0" +
        "&LAYER={layer}" +
        "&STYLE=" +
        "&TILEMATRIXSET={tileMatrixSet}" +
        "&TILEMATRIX={z}" +
        "&TILEROW={y}" +
        "&TILECOL={x}" +
        "&FORMAT={format}" +
        "&TIME={time}";

    var layer = L.tileLayer(template, {
        layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
        tileMatrixSet: "GoogleMapsCompatible_Level9",
        maxZoom: 9,
        format: "image%2Fjpeg",
        time: "2013-11-04",
        tileSize: 256,
        subdomains: "abc",
        noWrap: true,
        continuousWorld: true,
        attribution:
            "<a href='https://earthdata.nasa.gov/gibs'>" +
            "NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;" +
            "<a href='https://github.com/nasa-gibs/web-examples/blob/release/leaflet/js/webmercator-epsg3857.js'>" +
            "View Source" +
            "</a>"
    });

    map.addLayer(layer);
};

