window.onload = function() {

    var EPSG3031 = new L.Proj.CRS(
        "EPSG:3031",
        "+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 " +
        "+ellps=WGS84 +datum=WGS84 +units=m +no_defs", {
            origin: [-4194304, 4194304],
            resolutions: [
                8192.0,
                4096.0,
                2048.0,
                1024.0,
                512.0,
                256.0
            ]
        }
    );

    var map = L.map("map", {
        center: [-90, 0],
        zoom: 0,
        maxZoom: 5,
        crs: EPSG3031
    });

    var template =
        "https://map1{s}.vis.earthdata.nasa.gov/wmts-antarctic/wmts.cgi" +
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
        tileMatrixSet: "EPSG3031_250m",
        format: "image%2Fjpeg",
        time: "2013-11-01",
        tileSize: 512,
        subdomains: "abc",
        noWrap: true,
        continuousWorld: true,
        attribution: "<a href='https://earthdata.nasa.gov/about-eosdis/system-description/global-imagery-browse-services-gibs'>NASA EOSDIS GIBS</a>"
    });

    map.addLayer(layer);
};

