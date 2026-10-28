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

// Styles provided in GIBS getCapabilities
// https://gibs.earthdata.nasa.gov/wmts/epsg4326/std/wmts.cgi?request=GetCapabilities
// http://earthdata.nasa.gov/gibs/metadata-type/mapbox-gl-style/1.0
const MAPBOX_STYLE = {
  version: 8,
  name: 'SEDAC',
  sources: {
    GRanD_Dams: {
      type: 'vector',
      tiles: [
        'https://gibs.earthdata.nasa.gov/wmts/epsg4326/std/GRanD_Dams_v1.01_STD/default/{Time}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.mvt'
      ]
    }
  },
  layers: [
    {
      id: 'GRanD_Dams_v1.01_STD',
      source: 'GRanD_Dams',
      'source-layer': 'GRanD_Dams_v1.01_STD',
      'source-description': 'Default',
      type: 'circle',
      paint: {
        'circle-radius': [
          'step',
          [
            'zoom'
          ],
          1,
          17,
          2,
          19,
          3,
          22,
          7
        ],
        'circle-color': ['match',
          ['get', 'MAIN_USE'],
          'Fisheries',
          'rgb(152, 230, 0)',
          'Flood control',
          'rgb(168, 0, 0)',
          'Hydroelectricity',
          'rgb(230, 230, 0)',
          'Irrigation',
          'rgb(137,112,68)',
          'Navigation',
          'rgb(230, 152, 0)',
          'Other',
          'rgb(255, 190, 232)',
          'Recreation',
          'rgb(132, 0, 168)',
          'Water supply',
          'rgb(38, 115, 0)',
          'rgb(255, 255, 255)'
        ]
      }
    }
  ]
};

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

// MapLibre takes the GIBS style as it is. Its tile URL has WMTS placeholders,
// so fill in the date and tile matrix set and point the rest at {z}/{y}/{x}.
const damsSource = MAPBOX_STYLE.sources.GRanD_Dams;
damsSource.tiles = damsSource.tiles.map(function (url) {
  return url
    .replace('{Time}', '2020-03-18T00:00:00Z')
    .replace('{TileMatrixSet}', '2km')
    .replace('{TileMatrix}', '{z}')
    .replace('{TileRow}', '{y}')
    .replace('{TileCol}', '{x}');
});
damsSource.minzoom = 1;
damsSource.maxzoom = 6;
damsSource.bounds = [-180, -90, 180, 90];

new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    projection: { type: 'EPSG:4326' },
    sources: Object.assign({
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
      }
    }, MAPBOX_STYLE.sources),
    layers: [{
      id: 'base',
      type: 'raster',
      source: 'base'
    }].concat(MAPBOX_STYLE.layers)
  },
  // Request GIBS level z - 1 for map zoom z.
  transformRequest: function (url) {
    return {
      url: url.replace(/\/(500m|2km)\/(\d+)\//, function (match, set, z) {
        return '/' + set + '/' + (z - 1) + '/';
      })
    };
  },
  center: [0, 0],
  minZoom: 1,
  maxZoom: 9,
  zoom: 1
});
