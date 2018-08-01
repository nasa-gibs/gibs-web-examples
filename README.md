# gibs-web-examples

This project shows how to use [GIBS](https://earthdata.nasa.gov/gibs) as a tile
source for
[OpenLayers](http://openlayers.org), [Leaflet](http://leafletjs.com), [Cesium](http://cesiumjs.org/), [Mapbox GL](https://www.mapbox.com/help/define-mapbox-gl/), [Bing](http://www.bing.com/maps/), and [Google Maps](https://maps.google.com)

## Live Examples

* OpenLayers
  * [Geographic (EPSG:4326)](https://nasa-gibs.github.io/gibs-web-examples/examples/openlayers/geographic-epsg4326.html)
  * [Arctic (EPSG:3413)](https://nasa-gibs.github.io/gibs-web-examples/examples/openlayers/arctic-epsg3413.html)
  * [Antarctic (EPSG:3031)](https://nasa-gibs.github.io/gibs-web-examples/examples/openlayers/antarctic-epsg3031.html)
  * [Web Mercator (EPSG:3857)](https://nasa-gibs.github.io/gibs-web-examples/examples/openlayers/webmercator-epsg3857.html)
  * [Rolling Seven Day Slider](https://nasa-gibs.github.io/gibs-web-examples/examples/openlayers/time.html)
* Leaflet
  * [Geographic (EPSG:4326)](https://nasa-gibs.github.io/gibs-web-examples/examples/leaflet/geographic-epsg4326.html)
  * [Arctic (EPSG:3413)](https://nasa-gibs.github.io/gibs-web-examples/examples/leaflet/arctic-epsg3413.html)
  * [Antarctic (EPSG:3031)](https://nasa-gibs.github.io/gibs-web-examples/examples/leaflet/antarctic-epsg3031.html)
  * [Web Mercator (EPSG:3857)](https://nasa-gibs.github.io/gibs-web-examples/examples/leaflet/webmercator-epsg3857.html)
  * [Rolling Seven Day Slider](https://nasa-gibs.github.io/gibs-web-examples/examples/leaflet/time.html)
* Cesium
  * [Web Mercator (EPSG:3857)](https://nasa-gibs.github.io/gibs-web-examples/examples/cesium/webmercator-epsg3857.html)
  * [Geographic (EPSG:4326)](https://nasa-gibs.github.io/gibs-web-examples/examples/cesium/geographic-epsg4326.html)
  * [Time Slider](https://nasa-gibs.github.io/gibs-web-examples/examples/cesium/time.html)
  * [Demonstration of GIBS Layers](https://nasa-gibs.github.io/gibs-web-examples/examples/cesium/gibs-layers)
* Mapbox GL
  * [Web Mercator (EPSG:3857)](https://nasa-gibs.github.io/gibs-web-examples/examples/mapbox-gl/webmercator-epsg3857.html)
* Bing
  * [Web Mercator (EPSG:3857)](https://nasa-gibs.github.io/gibs-web-examples/examples/bing/webmercator-epsg3857.html)
* Google Maps
  * [Web Mercator (EPSG:3857)](https://nasa-gibs.github.io/gibs-web-examples/examples/google/webmercator-epsg3857.html)

## Overview

Clone the repository, then:

```bash
npm install
npm start
```

Navigate your browser to http://localhost:3001.

All examples show a single layer. Visit the
[GIBS Available Imagery Products](https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+Available+Imagery+Products)
for parameters needed to display other layers.

The [WMTS](http://www.opengeospatial.org/standards/wmts) standard does not
provide a way to select a specific time or date for a layer. GIBS has
implemented this feature in the following way:

* WMTS KVP: Use the `TIME` parameter to select a day in `YYYY-MM-DD` format.
* WMTS REST: Add the day in `YYYY-MM-DD` format between style name and the tile
matrix set name

See the "Rolling Seven Day Slider" examples for more information.

The Web Mercator endpoints return a blank map at zoom level zero due to a bug
in the tiling software. This issue will be fixed sometime in the future.

Some of the mapping libraries will attempt to fetch tiles outside the boundaries
of the tile matrix. GIBS returns error codes when these tile requests are
made.

[Worldview](https://github.com/nasa-gibs/worldview) is a web application that
uses GIBS as its primary image source.

## OpenLayers

This example uses [OpenLayers](http://openlayers.org/) version 5.1.3.

If geometry transformations are required using coordinates in the polar systems,
[proj4js](http://trac.osgeo.org/proj4js), version 2, must be included. This
example uses proj4js version 2.4.3. This is not required to simply display the map.

## Leaflet

This example uses [Leaflet](http://leafletjs.com) version 1.3.3.

To properly support the polar projections, the
[Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin must be
used. This example uses Proj4Leaflet version 1.0.1.

Gaps can sometimes be seen between the map tiles. Use the workaround found
here: https://github.com/Leaflet/Leaflet/issues/3575

## Cesium

This example uses [Cesium](http://cesiumjs.org/) version 1.47.

Use this
[GeographicTilingScheme](https://github.com/nasa-gibs/gibs-web-examples/blob/master/examples/cesium/gibs.js) when accessing the EPSG:4326 GIBS endpoint.

## Bing

This example uses the [Bing Maps Control](https://msdn.microsoft.com/en-us/library/mt712542.aspx), version 8.

## Google Maps

This example uses the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial), version 3.

## Questions

Send questions or comments to
[support@earthdata.nasa.gov](mailto:support@earthdata.nasa.gov)
