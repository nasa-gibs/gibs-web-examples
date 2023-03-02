/**
 * GIBS Web Examples
 *
 * Copyright 2013 - 2020 United States Government as represented by the
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
  var tilePath = 'wmts/epsg3857/best/' +
    'MODIS_Terra_CorrectedReflectance_TrueColor/default/' +
    '2018-06-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg';

  new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {
        gibs: {
          type: 'raster',
          tiles: [
            'https://gibs-a.earthdata.nasa.gov/' + tilePath,
            'https://gibs-b.earthdata.nasa.gov/' + tilePath,
            'https://gibs-c.earthdata.nasa.gov/' + tilePath
          ],
          tileSize: 256
        }
      },
      layers: [{
        id: 'gibs',
        type: 'raster',
        source: 'gibs',
        minzoom: 0,
        maxzoom: 8
      }]
    },
    center: [0, 0],
    minZoom: 0,
    maxZoom: 7,
    zoom: 2
  });
};
