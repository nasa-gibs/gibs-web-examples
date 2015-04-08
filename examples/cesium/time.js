/**
* GIBS Web Examples
*
* Copyright 2013 - 2015 United States Government as represented by the
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

    // Initially start at June 15, 2014
    var initialTime = Cesium.JulianDate.fromDate(
            new Date(Date.UTC(2014, 5, 15)));

    // Earliest date of Corrected Reflectance in archive: May 8, 2012
    var startTime = Cesium.JulianDate.fromDate(
            new Date(Date.UTC(2012, 4, 8)));

    var endTime = Cesium.JulianDate.now();

    var clock = new Cesium.Clock({
        startTime: startTime,
        endTime: endTime,
        currentTime: initialTime,
        multiplier: 0,   // Don't start animation by default
        clockRange: Cesium.ClockRange.CLAMPED
    });

    // Keep track of the previous day. Only update the layer on a tick if the
    // day has actually changed.
    var previousTime = null;

    // Current layer being shown
    var dailyProvider = null;

    // GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
    // Date.toISOString returns YYYY-MM-DDTHH:MM:SSZ. Split at the "T" and
    // take the date which is the first part.
    var isoDate = function(isoDateTime) {
        return isoDateTime.split("T")[0];
    };

    // Create the layer for the current day
    var createDailyProvider = function() {
        var isoDateTime = clock.currentTime.toString();
        var time = "TIME=" + isoDate(isoDateTime);

        // Day of the imagery to display is appended to the imagery
        // provider URL
        var provider = new Cesium.WebMapTileServiceImageryProvider({
            url: "//map1.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?" + time,
            layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
            style: "",
            format: "image/jpeg",
            tileMatrixSetID: "EPSG4326_250m",
            maximumLevel: 8,
            tileWidth: 256,
            tileHeight: 256,
            tilingScheme: gibs.GeographicTilingScheme()
        });

        return provider;
    };

    var viewer = new Cesium.Viewer("map", {
        clock: clock,
        baseLayerPicker: false, // Only showing one layer in this demo
        imageryProvider: createDailyProvider()
    });
    viewer.timeline.zoomTo(startTime, endTime);
    viewer.scene.globe.baseColor = Cesium.Color.BLACK;

    // When the clock changes, check to see if the day has changed and
    // replace the current layer with a new one. Don't do this check
    // too often.
    var onClockUpdate = _.throttle(function() {
        var isoDateTime = clock.currentTime.toString();
        var time = isoDate(isoDateTime);
        if ( time !== previousTime ) {
            previousTime = time;
            viewer.scene.imageryLayers.removeAll();
            viewer.scene.imageryLayers.addImageryProvider(
                    createDailyProvider());
        }
    }, 250, {leading: true, trailing: true});

    viewer.clock.onTick.addEventListener(onClockUpdate);
    onClockUpdate();

};
