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
  var map = L.map('map', {
    center: [0, 0],
    zoom: 3,
    // Values are x and y here instead of lat and long elsewhere.
    maxBounds: [
      [-120, -220],
      [120, 220]
    ]
  });

  var template =
    '//gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/' +
    '{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg';

  var layer = L.tileLayer(template, {
    layer: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    tileMatrixSet: 'GoogleMapsCompatible_Level9',
    maxZoom: 9,
    time: '2013-11-04',
    tileSize: 256,
    subdomains: 'abc',
    noWrap: true,
    continuousWorld: true,
    // Prevent Leaflet from retrieving non-existent tiles on the
    // borders.
    bounds: [
      [-85.0511287776, -179.999999975],
      [85.0511287776, 179.999999975]
    ],
    attribution:
      '<a href="https://wiki.earthdata.nasa.gov/display/GIBS">' +
      'NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;' +
      '<a href="https://github.com/nasa-gibs/web-examples/blob/main/examples/leaflet/webmercator-epsg3857.js">' +
      'View Source' +
      '</a>'
  });

  map.addLayer(layer);
};

/*
* Workaround for 1px lines appearing in some browsers due to fractional transforms
* and resulting anti-aliasing.
* https://github.com/Leaflet/Leaflet/issues/3575
*/
(function () {
  var originalInitTile = L.GridLayer.prototype._initTile;
  L.GridLayer.include({
    _initTile: function (tile) {
      originalInitTile.call(this, tile);

      var tileSize = this.getTileSize();

      tile.style.width = tileSize.x + 1 + 'px';
      tile.style.height = tileSize.y + 1 + 'px';
    }
  });
})();
