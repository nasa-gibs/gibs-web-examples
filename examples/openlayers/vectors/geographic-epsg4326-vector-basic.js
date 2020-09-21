window.onload = function () {
  const circleStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({
        color: 'rgb(236, 98, 16)'
      })
    })
  });

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

  const vectorLayer = new ol.layer.VectorTile({
    renderMode: 'image',
    style: circleStyle,
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
  new ol.Map({
    layers: [base, vectorLayer],
    target: 'map',
    view: new ol.View({
      center: [0, 0],
      maxZoom: 8,
      zoom: 1,
      extent: [-180, -90, 180, 90],
      projection: ol.proj.get('EPSG:4326')
    })
  });
};
