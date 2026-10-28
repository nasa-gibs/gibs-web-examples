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

const basePath = 'wmts/epsg4326/best/' +
  'BlueMarble_NextGeneration/default/' +
  '2020-04-27/500m/{z}/{y}/{x}.jpg';

const firesUrl = 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?' +
  'TIME=2020-09-18T00:00:00Z&layer=VIIRS_NOAA20_Thermal_Anomalies_375m_All&tilematrixset=500m&' +
  'Service=WMTS&Request=GetTile&Version=1.0.0&FORMAT=application%2Fvnd.mapbox-vector-tile&' +
  'TileMatrix={z}&TileCol={x}&TileRow={y}';

const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    projection: { type: 'EPSG:4326' },
    sources: {
      base: {
        type: 'raster',
        tiles: [
          'https://gibs-a.earthdata.nasa.gov/' + basePath,
          'https://gibs-b.earthdata.nasa.gov/' + basePath,
          'https://gibs-c.earthdata.nasa.gov/' + basePath
        ],
        tileSize: 512,
        minzoom: 1,
        maxzoom: 9,
        // GIBS has no tiles past the edge of the world.
        bounds: [-180, -90, 180, 90]
      },
      fires: {
        type: 'vector',
        tiles: [firesUrl],
        minzoom: 1,
        maxzoom: 8,
        bounds: [-180, -90, 180, 90]
      }
    },
    layers: [{
      id: 'base',
      type: 'raster',
      source: 'base'
    }, {
      id: 'fires',
      type: 'circle',
      source: 'fires',
      'source-layer': 'VIIRS_NOAA20_Thermal_Anomalies_375m_All_v2_NRT',
      paint: {
        'circle-radius': 5,
        'circle-color': 'rgb(236, 98, 16)'
      }
    }]
  },
  // Request GIBS level z - 1 for map zoom z.
  transformRequest: function (url) {
    return {
      url: url.replace(/\/(500m)\/(\d+)\//, function (match, set, z) {
        return '/' + set + '/' + (z - 1) + '/';
      }).replace(/TileMatrix=(\d+)/, function (match, z) {
        return 'TileMatrix=' + (z - 1);
      })
    };
  },
  center: [0, 0],
  minZoom: 1,
  maxZoom: 9,
  zoom: 1
});

const info = document.getElementById('info');

map.on('mousemove', 'fires', function (event) {
  info.innerText = JSON.stringify(event.features[0].properties, null, 2);
  info.style.opacity = 1;
});

map.on('mouseleave', 'fires', function () {
  info.innerText = '';
  info.style.opacity = 0;
});
