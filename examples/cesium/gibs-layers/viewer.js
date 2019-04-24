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

gibs.Viewer = function (config) {
  // Earliest date of Corrected Reflectance in archive: Feb 24, 2000
  var startTime = Cesium.JulianDate.fromDate(
    new Date(Date.UTC(2000, 1, 24)));

  var endTime = Cesium.JulianDate.now();

  // If slightly after midnight, show the previous day's data while
  // the near-real time imagery is processing.
  var show = new Date();
  if (show.getUTCHours() < 3) {
    show.setUTCDate(show.getUTCDate() - 1);
  }
  var initialTime = Cesium.JulianDate.fromDate(show);

  // Keep track of the previous day. Only update the layer on a tick if the
  // day has actually changed.
  var previousTime = null;
  var selectedSet = null;

  var clock = new Cesium.Clock();
  var clockViewModel = new Cesium.ClockViewModel(clock);
  clockViewModel.startTime = startTime;
  clockViewModel.endTime = endTime;
  clockViewModel.currentTime = initialTime;
  clockViewModel.multiplier = 0; // Don't start animation by default
  clockViewModel.clockRange = Cesium.ClockRange.CLAMPED;

  // GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
  // Date.toISOString returns YYYY-MM-DDTHH:MM:SSZ. Split at the 'T' and
  // take the date which is the first part.
  var isoDate = function (isoDateTime) {
    return isoDateTime.split('T')[0];
  };

  // Create the layer for the current day
  var createProvider = function (layerId) {
    var layer = config.layers[layerId];
    var time = '';

    if (layer.startDate) {
      var isoDateTime = clock.currentTime.toString();
      time = '?TIME=' + isoDate(isoDateTime);
    }

    var provider;
    if (!layer.wms) {
      var resolution = config.resolutions[layer.resolution];
      var options = {
        url: '//gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi' + time,
        layer: layer.id,
        style: '',
        format: layer.format,
        tileMatrixSetID: resolution.tileMatrixSetID,
        minimumLevel: 0,
        maximumLevel: resolution.maximumLevel,
        tileWidth: 512,
        tileHeight: 512,
        tilingScheme: gibs.GeographicTilingScheme()
      };
      if (layer.credit) {
        options.credit = layer.credit;
      }
      provider = new Cesium.WebMapTileServiceImageryProvider(options);
    } else {
      var optionsWMS = {
        url: '//gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi' + time,
        layers: layer.id,
        parameters: {
          transparent: true,
          format: 'image/png'
        }
      };
      if (layer.credit) {
        options.credit = layer.credit;
      }
      provider = new Cesium.WebMapServiceImageryProvider(optionsWMS);
    }
    return provider;
  };

  var models = [];
  config.sets.forEach(function (set) {
    var model = new Cesium.ProviderViewModel({
      name: set.name,
      iconUrl: set.icon,
      creationFunction: function () {
        // Return an empty set and update the layers in the same
        // way done when the clock changes.
        selectedSet = set;
        setTimeout(updateLayers, 0);
        return [];
      }
    });
    models.push(model);
  });

  var viewer = new Cesium.Viewer('map', {
    clockViewModel: clockViewModel,
    imageryProviderViewModels: models,
    terrainProviderViewModels: [],
    geocoder: false
  });

  // Set the timeline to show up to a year ago
  var previousYear = new Date();
  previousYear.setUTCFullYear(previousYear.getUTCFullYear() - 1);
  viewer.timeline.zoomTo(Cesium.JulianDate.fromDate(previousYear), endTime);

  viewer.clock.onTick.addEventListener(onClockUpdate);
  onClockUpdate();
  viewer.scene.globe.baseColor = Cesium.Color.BLACK;

  // Invoked when the current day changes, but do not call this too often
  // if the user is sweeping through days.
  function updateLayers() {
    var qs = document.querySelector.bind(document);
    var layers = viewer.scene.imageryLayers;
    layers.removeAll();
    selectedSet.layers.forEach(function (layerId) {
      layers.addImageryProvider(createProvider(layerId));
    });

    var legend = selectedSet.legend;
    if (!legend) {
      qs('#legend').style.display = 'none';
    } else if (legend.type === 'scale') {
      qs('.scale .legend-title').textContent = legend.title;
      qs('.legend-colorbar').setAttribute('src', legend.colorbar);
      qs('.legend-max').innerHTML = legend.max;
      qs('.legend-min').innerHTML = legend.min;
      qs('#legend .single').style.display = 'none';
      qs('#legend .scale').style.display = 'block';
      qs('#legend').style.display = 'block';
    } else {
      qs('.single .legend-title').textContent = legend.title;
      qs('.legend-color').style.backgroundColor = legend.color;
      qs('#legend .scale').style.display = 'none';
      qs('#legend .single').style.display = 'block';
      qs('#legend').style.display = 'block';
    }
  };

  // When the clock changes, check to see if the day has changed and
  // replace the current layers
  var updateTimer = null;
  function onClockUpdate() {
    var isoDateTime = clock.currentTime.toString();
    var time = isoDate(isoDateTime);
    if (time !== previousTime) {
      previousTime = time;
      clearTimeout(updateTimer);
      updateTimer = setTimeout(updateLayers, 250);
    }
  };

  function getLeadingPoint() {
    // Set default extent according to time of day:
    //   at 00:00 UTC, start at far eastern edge of map: '20.6015625,-46.546875,179.9296875,53.015625'
    //   at 23:00 UTC, start at far western edge of map: '-179.9296875,-46.546875,-20.6015625,53.015625'
    var curHour = new Date().getUTCHours();

    // For earlier hours when data is still being filled in, force a far eastern perspective
    if (curHour < 3) {
      curHour = 23;
    }

    // Adjust for globe view
    curHour -= 5;

    // Compute east/west bounds
    var minLon = 20.6015625 + curHour * (-200.53125 / 23.0);
    var maxLon = minLon + 159.328125;

    var minLat = -46.546875;
    var maxLat = 53.015625;

    return new Cesium.Rectangle(
      Cesium.Math.toRadians(minLon),
      Cesium.Math.toRadians(minLat),
      Cesium.Math.toRadians(maxLon),
      Cesium.Math.toRadians(maxLat)
    );
  };

  viewer.camera.setView({ destination: getLeadingPoint() });

  return viewer;
};
