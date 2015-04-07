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

    var map = new ol.Map({
        view: new ol.View({
            extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
            center: [0, 0],
            zoom: 3,
            maxZoom: 9
        }),
        target: "map",
        renderer: ["canvas", "dom"],
    });

    var source = new ol.source.XYZ({
        url: "//map1{a-c}.vis.earthdata.nasa.gov/wmts-webmerc/" +
            "MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-06-15/" +
            "GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg"
    });

    var layer = new ol.layer.Tile({source: source});

    map.addLayer(layer);
};
