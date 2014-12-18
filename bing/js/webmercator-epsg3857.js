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

    var map = new Microsoft.Maps.Map(document.getElementById("map"), {
        // Obtain your own API key at
        // https://www.bingmapsportal.com
        credentials: "AhbILr0g2neqbaGZ_NN83LxRbcYVv_8oNgQv3ITZ-Dq0NsUIor1w8C8pIufTQhzv",
        center: new Microsoft.Maps.Location(21, 78),
        zoom: 5,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disableBirdseye: true
    });

    var uriConstructor = function(tile) {
        return "//map1.vis.earthdata.nasa.gov/wmts-webmerc/" +
                "MODIS_Terra_Aerosol/default/2013-12-02/" +
                "GoogleMapsCompatible_Level6/" +
                tile.levelOfDetail + "/" + tile.y + "/" + tile.x + ".png";
     };

    var source = new Microsoft.Maps.TileSource({
        uriConstructor: uriConstructor
    });
    var layer = new Microsoft.Maps.TileLayer({
        mercator: source,
        opacity: 0.5
    });
    map.entities.push(layer);

};
