/**
 * GIBS Web Examples
 *
 * Copyright 2013 - 2026 United States Government as represented by the
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

import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.16.0/dist/maplibre-gl.mjs';

proj4.defs('EPSG:3413',
  '+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 +x_0=0 +y_0=0 ' +
  '+datum=WGS84 +units=m +no_defs');

// GIBS serves EPSG:3413 in 512 px tiles over a square 8,388,608 m wide,
// centered on the pole, with 2 x 2 tiles at level 0. MapLibre starts from a
// single tile, so its zoom 1 is GIBS level 0.
maplibregl.addProjection({
  name: 'EPSG:3413',
  projection: proj4('EPSG:4326', 'EPSG:3413'),
  tileMatrixSet: {
    origin: [-4194304, 4194304],
    extentAtZoom0: 8388608
  }
});

const tilePath = 'wmts/epsg3413/best/' +
  'MODIS_Terra_CorrectedReflectance_TrueColor/default/' +
  '2013-06-15/250m/{z}/{y}/{x}.jpg';

new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    projection: { type: 'EPSG:3413' },
    sources: {
      gibs: {
        type: 'raster',
        tiles: [
          'https://gibs-a.earthdata.nasa.gov/' + tilePath,
          'https://gibs-b.earthdata.nasa.gov/' + tilePath,
          'https://gibs-c.earthdata.nasa.gov/' + tilePath
        ],
        tileSize: 512,
        minzoom: 1,
        maxzoom: 6
      }
    },
    layers: [{
      id: 'gibs',
      type: 'raster',
      source: 'gibs'
    }]
  },
  // Request GIBS level z - 1 for map zoom z.
  transformRequest: function (url) {
    return {
      url: url.replace(/\/250m\/(\d+)\//, function (match, z) {
        return '/250m/' + (z - 1) + '/';
      })
    };
  },
  center: [0, 90],
  minZoom: 1,
  maxZoom: 6,
  zoom: 1
});
