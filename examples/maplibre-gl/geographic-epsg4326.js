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

// GIBS serves EPSG:4326 in 512 px tiles of 288 degrees from (-180, 90), with
// 2 x 1 tiles at level 0. MapLibre starts from a single tile, so it registers
// the 576 degree square around them and its zoom 1 is GIBS level 0.
maplibregl.addProjection({
  name: 'EPSG:4326',
  // Longitude and latitude are the coordinates of the grid.
  projection: {
    forward: function (lngLat) {
      return lngLat;
    },
    inverse: function (xy) {
      return xy;
    }
  },
  tileMatrixSet: {
    origin: [-180, 90],
    extentAtZoom0: 576
  }
});

const tilePath = 'wmts/epsg4326/best/' +
  'MODIS_Terra_CorrectedReflectance_TrueColor/default/' +
  '2013-11-04/250m/{z}/{y}/{x}.jpg';

new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    projection: { type: 'EPSG:4326' },
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
        maxzoom: 9,
        // GIBS has no tiles past the edge of the world.
        bounds: [-180, -90, 180, 90]
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
      url: url.replace(/\/(250m)\/(\d+)\//, function (match, set, z) {
        return '/' + set + '/' + (z - 1) + '/';
      })
    };
  },
  center: [0, 0],
  minZoom: 1,
  maxZoom: 9,
  zoom: 3
});
