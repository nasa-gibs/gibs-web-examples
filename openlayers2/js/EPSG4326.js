window.onload = function() {

    var map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:4326",
        numZoomLevels: 9,
    });

    var layer = new OpenLayers.Layer.WMTS({
        name: "Terra / MODIS Corrected Reflectance (True Color)",
        url: [
            "https://map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi",
            "https://map1b.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi",
            "https://map1c.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi"
        ],
        layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
        style: "",
        matrixSet: "EPSG4326_250m",
        maxResolution: 0.5625,
        numZoomLevels: 9,
        attribution: "NASA EOSDIS GIBS",
        tileSize: new OpenLayers.Size(512, 512),
        format: "image/jpeg",
        projection: "EPSG:4326",
        attribution: "<a href='https://earthdata.nasa.gov/about-eosdis/system-description/global-imagery-browse-services-gibs'>NASA EOSDIS GIBS</a>"
    });
    layer.mergeNewParams({time: "2013-11-04"});

    map.addLayer(layer);
    map.setCenter([0, 0], 1);
};

