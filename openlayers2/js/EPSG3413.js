window.onload = function() {

    proj4.defs["EPSG:3413"] =
        "+title=WGS 84 / NSIDC Sea Ice Polar Stereographic North " +
        "+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 +x_0=0 +y_0=0 " +
        "+datum=WGS84 +units=m +no_defs";

    var map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:3413",
        numZoomLevels: 6
    });

    var layer = new OpenLayers.Layer.WMTS({
        name: "Terra / MODIS Corrected Reflectance (True Color)",
        url: [
            "https://map1a.vis.earthdata.nasa.gov/wmts-arctic/wmts.cgi",
            "https://map1b.vis.earthdata.nasa.gov/wmts-arctic/wmts.cgi",
            "https://map1c.vis.earthdata.nasa.gov/wmts-arctic/wmts.cgi"
        ],
        layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
        style: "",
        matrixSet: "EPSG3413_250m",
        maxResolution: 8192.0,
        numZoomLevels: 6,
        maxExtent: [-4194304, -4194304, 4194304, 4194304],
        tileSize: new OpenLayers.Size(512, 512),
        format: "image/jpeg",
        projection: "EPSG:4326",
        attribution: "<a href='https://earthdata.nasa.gov/about-eosdis/system-description/global-imagery-browse-services-gibs'>NASA EOSDIS GIBS</a>"
    });
    layer.mergeNewParams({time: "2013-06-15"});

    map.addLayer(layer);
    map.setCenter([0, 0], 0);
};
