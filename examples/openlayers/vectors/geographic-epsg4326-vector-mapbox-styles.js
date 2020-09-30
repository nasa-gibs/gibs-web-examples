// Styles provided in GIBS getCapabilities
// https://gibs.earthdata.nasa.gov/wmts/epsg4326/std/wmts.cgi?request=GetCapabilities
// http://earthdata.nasa.gov/gibs/metadata-type/mapbox-gl-style/1.0
const MAPBOX_STYLE = {
  'version': 8,
  'name': 'SEDAC',
  'sources': {
    'GRanD_Dams': {
      'type': 'vector',
      'tiles': [
        'https://gibs.earthdata.nasa.gov/wmts/epsg4326/std/GRanD_Dams_v1.01_STD/default/{Time}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.mvt'
      ]
    }
  },
  'layers': [
    {
      'id': 'GRanD_Dams_v1.01_STD',
      'source': 'GRanD_Dams',
      'source-layer': 'GRanD_Dams_v1.01_STD',
      'source-description': 'Default',
      'type': 'circle',
      'paint': {
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

window.onload = function () {
  var base = new ol.layer.Tile({
    extent: [-180, -90, 180, 90],
    crossOrigin: 'anonymous',
    source: new ol.source.WMTS({
      url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2020-04-27',
      layer: 'BlueMarble_NextGeneration',
      format: 'image/jpeg',
      matrixSet: '500m',
      tileGrid: new ol.tilegrid.WMTS({
        origin: [-180, 90],
        resolutions: [0.140625, 0.0703125, 0.03515625, 0.017578125, 0.0087890625, 0.00439453125, 0.002197265625],
        matrixIds: [2, 3, 4, 5, 6, 7, 8],
        tileSize: 512
      })
    })
  });
  const map = new ol.Map({
    layers: [base],
    target: 'map',
    view: new ol.View({
      center: [0, 0],
      maxZoom: 8,
      zoom: 1,
      extent: [-180, -90, 180, 90],
      projection: ol.proj.get('EPSG:4326')
    })
  });
  const vectorLayer = new ol.layer.VectorTile({
    renderMode: 'image',
    source: new ol.source.VectorTile({
      visible: true,
      url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2020-03-18T00:00:00Z&layer=GRanD_Dams&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&FORMAT=application%2Fvnd.mapbox-vector-tile&TileMatrix={z}&TileCol={x}&TileRow={y}',
      format: new ol.format.MVT(),
      projection: ol.proj.get('EPSG:4326'),
      tileGrid: new ol.tilegrid.WMTS({
        extent: [-180, -90, 180, 90],
        resolutions: [0.5625, 0.28125, 0.140625, 0.0703125, 0.03515625, 0.017578125],
        tileSize: [512, 512]
      })
    })
  });
  map.addLayer(vectorLayer);
  // ol-mapbox-style library
  // https://github.com/openlayers/ol-mapbox-style
  olms.stylefunction(vectorLayer, MAPBOX_STYLE, 'GRanD_Dams');
};
