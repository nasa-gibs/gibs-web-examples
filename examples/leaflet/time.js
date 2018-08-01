/**
 * GIBS Web Examples
 *
 * Copyright 2013 - 2018 United States Government as represented by the
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
  var EPSG4326 = new L.Proj.CRS(
    'EPSG:4326',
    '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs', {
      origin: [-180, 90],
      resolutions: [
        0.5625,
        0.28125,
        0.140625,
        0.0703125,
        0.03515625,
        0.017578125,
        0.0087890625,
        0.00439453125,
        0.002197265625
      ],
      // Values are x and y here instead of lat and long elsewhere.
      bounds: L.bounds([
        [-180, -90],
        [180, 90]
      ])
    }
  );

  // Seven day slider based off today, remember what today is
  var today = new Date();

  // Selected day to show on the map
  var day = new Date(today.getTime());

  // GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
  // Date.toISOString returns YYYY-MM-DDTHH:MM:SSZ. Split at the 'T' and
  // take the date which is the first part.
  function dayParameter() {
    return day.toISOString().split('T')[0];
  };

  var map = L.map('map', {
    center: [0, 0],
    zoom: 2,
    maxZoom: 8,
    crs: EPSG4326,
    maxBounds: [
      [-120, -220],
      [120, 220]
    ],
    // Animation interferes with smooth scrolling of the slider once
    // all the layers are cached
    fadeAnimation: false
  });

  var update = function () {
    // There is only one layer in this example, but remove them all
    // anyway
    clearLayers();

    // Add the new layer for the selected time
    map.addLayer(createLayer());

    // Update the day label
    document.querySelector('#day-label').textContent = dayParameter();
  };

  function clearLayers() {
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
  };

  var template =
    '//map1{s}.vis.earthdata.nasa.gov/wmts-geo/' +
    '{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg';

  function createLayer() {
    var layer = L.tileLayer(template, {
      layer: 'MODIS_Terra_CorrectedReflectance_TrueColor',
      tileMatrixSet: 'EPSG4326_250m',
      time: dayParameter(),
      tileSize: 512,
      subdomains: 'abc',
      noWrap: true,
      continuousWorld: true,
      // Prevent Leaflet from retrieving non-existent tiles on the
      // borders.
      bounds: [
        [-89.9999, -179.9999],
        [89.9999, 179.9999]
      ],
      attribution:
        '<a href="https://wiki.earthdata.nasa.gov/display/GIBS">' +
        'NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;' +
        '<a href="https://github.com/nasa-gibs/web-examples/blob/master/examples/leaflet/time.js">' +
        'View Source' +
        '</a>'
    });
    return layer;
  };

  update();

  // Slider values are in 'days from present'.
  document.querySelector('#day-slider')
    .addEventListener('change', function (event) {
      // Add the slider value (effectively subracting) to today's
      // date.
      var newDay = new Date(today.getTime());
      newDay.setUTCDate(today.getUTCDate() +
        Number.parseInt(event.target.value));
      day = newDay;
      update();
    });
};
