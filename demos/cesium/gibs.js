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

var gibs = gibs || {};

gibs.GeographicTilingScheme = function(options) {

    var self = new Cesium.GeographicTilingScheme(options);
    var Math = Cesium.Math;

    var tilePixels = 512;
    var rectangle = Cesium.Rectangle.MAX_VALUE;

    // Resolution: radians per pixel
    var levels = [
        { width:  2,  height:   1, resolution: 0.009817477042468103 },
        { width:  3,  height:   2, resolution: 0.004908738521234052 },
        { width:  5,  height:   3, resolution: 0.002454369260617026 },
        { width:  10, height:   5, resolution: 0.001227184630308513 },
        { width:  20, height:  10, resolution: 0.0006135923151542565 },
        { width:  40, height:  20, resolution: 0.00030679615757712823 },
        { width:  80, height:  40, resolution: 0.00015339807878856412 },
        { width: 160, height:  80, resolution: 0.00007669903939428206 },
        { width: 320, height: 160, resolution: 0.00003834951969714103 }
    ];

    self.getNumberOfXTilesAtLevel = function(level) {
        return levels[level].width;
    };

    self.getNumberOfYTilesAtLevel = function(level) {
        return levels[level].height;
    };

    self.tileXYToRectangle = function(x, y, level, result) {
        var xTiles = levels[level].width;
        var yTiles = levels[level].height;
        var resolution = levels[level].resolution;

        var xTileWidth = resolution * tilePixels;
        var west = x * xTileWidth + rectangle.west;
        var east = (x + 1) * xTileWidth + rectangle.west;

        var yTileHeight = resolution * tilePixels;
        var north = rectangle.north - y * yTileHeight;
        var south = rectangle.north - (y + 1) * yTileHeight;

        if ( !result ) {
            result = new Cesium.Rectangle(0, 0, 0, 0);
        }
        result.west = west;
        result.south = south;
        result.east = east;
        result.north = north;
        return result;
    };

    self.positionToTileXY = function(position, level, result) {
        if ( !Cesium.Rectangle.contains(rectangle, position) ) {
            return undefined;
        }

        var xTiles = levels[level].width;
        var yTiles = levels[level].height;
        var resolution = levels[level].resolution;

        var xTileWidth = resolution * tilePixels;
        var yTileHeight = resolution * tilePixels;

        var longitude = position.longitude;
        if ( rectangle.east < rectangle.west ) {
            longitude += Math.TWO_PI;
        }

        var xTileCoordinate = (longitude - rectangle.west) / xTileWidth | 0;
        if ( xTileCoordinate >= xTiles ) {
            xTileCordinate = xTiles - 1;
        }

        var latitude = position.latitude;
        var yTileCoordinate = (rectangle.north - latitude) / yTileHeight | 0;
        if ( yTileCoordinate > yTiles ) {
            yTileCoordinate = yTiles - 1;
        }

        if ( !result ) {
            result = new Cesium.Cartesian2(0, 0);
        }
        result.x = xTileCoordinate;
        result.y = yTileCoordinate;
        return result;
    };

    return self;
};

gibs.ClockModel = function(viewer) {

    var self = {};

    // Initially start at June 15, 2014
    var initialTime = Cesium.JulianDate.fromDate(
            new Date(Date.UTC(2014, 5, 15)));

    // Earliest date of Corrected Reflectance in archive: May 8, 2012
    var startTime = Cesium.JulianDate.fromDate(
            new Date(Date.UTC(2012, 4, 8)));

    var endTime = Cesium.JulianDate.now();

    var clock = new Cesium.Clock({
        currentTime: initialTime,
        multiplier: 0   // Don't start animation by default
    });

    // Keep track of the previous day. Only update the layer on a tick if the
    // day has actually changed.
    var previousTime = null;

    // Current layer being shown
    var dailyProvider = null;

    var init = function() {
        viewer.timeline.zoomTo(startTime, endTime);
        viewer.clock.onTick.addEventListener(onClockUpdate);
        onClockUpdate();
    };

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
            minimumLevel: 0,
            maximumLevel: 8,
            tileWidth: 512,
            tileHeight: 512,
            tilingScheme: gibs.GeographicTilingScheme()
        });

        return provider;
    };

    // When the clock changes, check to see if the day has changed and
    // replace the current layer with a new one. Don't do this check
    // more than once a second.
    var onClockUpdate = _.throttle(function() {
        var isoDateTime = clock.currentTime.toString();
        var time = isoDate(isoDateTime);
        if ( time !== previousTime ) {
            previousTime = time;
            if ( dailyProvider ) {
                viewer.scene.imageryLayers.remove(dailyLayer);
            }
            dailyLayer = viewer.scene.imageryLayers.addImageryProvider(
                    createDailyProvider());
        }
    }, 1000);

    return self;
};

