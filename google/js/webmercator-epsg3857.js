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

    var mapOptions = {
        center: new google.maps.LatLng(21, 78),
        zoom: 5,
        maxZoom: 6
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var getTileUrl = function(tile, zoom) {
        return "//map1.vis.earthdata.nasa.gov/wmts-webmerc/" +
               "MODIS_Terra_Aerosol/default/2013-12-02/" +
               "GoogleMapsCompatible_Level6/" +
                zoom + "/" + tile.y + "/" +
                tile.x + ".png";
    };

    var layerOptions = {
        alt: "MODIS_Terra_Aerosol",
        getTileUrl: getTileUrl,
        maxZoom: 6,
        minZoom: 1,
        name: "MODIS_Terra_Aerosol",
        tileSize: new google.maps.Size(256, 256),
        opacity: 0.5
    };

    var imageMapType = new google.maps.ImageMapType(layerOptions);
    map.overlayMapTypes.insertAt(0, imageMapType);
};
