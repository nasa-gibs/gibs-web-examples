/**
* GIBS Web Examples
*
* Copyright 2013 - 2023 United States Government as represented by the
* Administrator of the National Aeronautics and Space Administration.
* All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the 'License');
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an 'AS IS' BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

window.onload = function () {
  // Initially start at June 15, 2014
  var initialTime = Cesium.JulianDate.fromDate(
    new Date(Date.UTC(2014, 5, 15)));

  // Earliest date of Corrected Reflectance in archive: Feb 24, 2000
  var startTime = Cesium.JulianDate.fromDate(
    new Date(Date.UTC(2000, 1, 24)));

  var endTime = Cesium.JulianDate.now();

  var clock = new Cesium.Clock();
  var clockViewModel = new Cesium.ClockViewModel(clock);
  clockViewModel.startTime = startTime;
  clockViewModel.endTime = endTime;
  clockViewModel.currentTime = initialTime;
  clockViewModel.multiplier = 0; // Don't start animation by default
  clockViewModel.clockRange = Cesium.ClockRange.CLAMPED;

  // Keep track of the previous day. Only update the layer on a tick if the
  // day has actually changed.
  var previousTime = null;

  // GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
  // Date.toISOString returns YYYY-MM-DDTHH:MM:SSZ. Split at the 'T' and
  // take the date which is the first part.
  var isoDate = function (isoDateTime) {
    return isoDateTime.split('T')[0];
  };

  // Create the layer for the current day
  var createDailyProvider = function () {
    var isoDateTime = clock.currentTime.toString();
    var time = 'TIME=' + isoDate(isoDateTime);

    // Day of the imagery to display is appended to the imagery
    // provider URL
    var provider = new Cesium.WebMapTileServiceImageryProvider({
      url: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?' + time,
      layer: 'MODIS_Terra_CorrectedReflectance_TrueColor',
      style: '',
      format: 'image/jpeg',
      tileMatrixSetID: '250m',
      maximumLevel: 8,
      tileWidth: 256,
      tileHeight: 256,
      tilingScheme: gibs.GeographicTilingScheme()
    });

    return provider;
  };

  var viewer = new Cesium.Viewer('map', {
    clockViewModel: clockViewModel,
    baseLayerPicker: false, // Only showing one layer in this demo
    imageryProvider: createDailyProvider(),
    geocoder: false // Cesium Ion account needed for geocoder
  });

  // Set the timeline to show up to a year ago
  var previousYear = new Date();
  previousYear.setUTCFullYear(previousYear.getUTCFullYear() - 1);
  viewer.timeline.zoomTo(Cesium.JulianDate.fromDate(previousYear), endTime);

  viewer.scene.globe.baseColor = Cesium.Color.BLACK;

  // When the clock changes, check to see if the day has changed and
  // replace the current layer with a new one.
  function doClockUpdate() {
    viewer.scene.imageryLayers.removeAll();
    viewer.scene.imageryLayers.addImageryProvider(
      createDailyProvider());
  };

  // Don't do this check too often
  var updateTimer = null;
  function onClockUpdate() {
    var isoDateTime = clock.currentTime.toString();
    var time = isoDate(isoDateTime);
    if (time !== previousTime) {
      previousTime = time;
      clearTimeout(updateTimer);
      updateTimer = setTimeout(doClockUpdate, 250);
    }
  }

  viewer.clock.onTick.addEventListener(onClockUpdate);
  onClockUpdate();
};
