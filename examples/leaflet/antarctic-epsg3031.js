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
  var EPSG3031 = new L.Proj.CRS(
    'EPSG:3031',
    '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 ' +
    '+ellps=WGS84 +datum=WGS84 +units=m +no_defs', {
      origin: [-4194304, 4194304],
      resolutions: [
        8192.0,
        4096.0,
        2048.0,
        1024.0,
        512.0,
        256.0
      ],
      bounds: L.Bounds([
        [-4194304, -4194304],
        [4194304, 4194304]
      ])
    }
  );

  var map = L.map('map', {
    center: [-90, 0],
    zoom: 0,
    maxZoom: 5,
    crs: EPSG3031
  });

  var template =
    '//gibs-{s}.earthdata.nasa.gov/wmts/epsg3031/best/' +
    '{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg';

  var layer = L.tileLayer(template, {
    layer: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
    tileMatrixSet: 'EPSG3031_250m',
    format: 'image%2Fjpeg',
    time: '2013-12-01',
    tileSize: 512,
    subdomains: 'abc',
    noWrap: true,
    continuousWorld: true,
    attribution:
      '<a href="https://wiki.earthdata.nasa.gov/display/GIBS">' +
      'NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;' +
      '<a href="https://github.com/nasa-gibs/web-examples/blob/master/examples/leaflet/antarctic-epsg3031.js">' +
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
