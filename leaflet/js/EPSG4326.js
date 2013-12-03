window.onload = function() {

    var EPSG4326 = new L.Proj.CRS(
        "EPSG:4326",
        "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs", {
            origin: [-180, 90],
            resolutions: [
                0.5625,
                0.28125,
                0.140625,
                0.0703125,
                0.03515625,
                0.017578125,
                0.0087890625,
                0.00439453125,
                0.002197265625
            ]
        }
    );

    var map = L.map("map", {
        center: [0, 0],
        zoom: 2,
        maxBounds: [
            [-120, -220],
            [120, 220]
        ],
        crs: EPSG4326
    });

    var template =
        "https://map1{s}.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi" +
        "?SERVICE=WMTS" +
        "&REQUEST=GetTile" +
        "&VERSION=1.0.0" +
        "&LAYER={layer}" +
        "&STYLE=" +
        "&TILEMATRIXSET={tileMatrixSet}" +
        "&TILEMATRIX={z}" +
        "&TILEROW={y}" +
        "&TILECOL={x}" +
        "&FORMAT={format}" +
        "&TIME={time}";

    var layer = L.tileLayer(template, {
        layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
        tileMatrixSet: "EPSG4326_250m",
        format: "image%2Fjpeg",
        time: "2013-11-04",
        tileSize: 512,
        subdomains: "abc",
        noWrap: true,
        continuousWorld: true,
        attribution: "<a href='https://earthdata.nasa.gov/about-eosdis/system-description/global-imagery-browse-services-gibs'>NASA EOSDIS GIBS</a>"
    });

    map.addLayer(layer);
};

