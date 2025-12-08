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
  * [Vector Tile Basic Use](https://nasa-gibs.github.io/gibs-web-examples/examples/openlayers/vectors/geographic-epsg4326-vector-basic.html)
  * [Vector Tile feature interactions](https://nasa-gibs.github.io/gibs-web-examples/examples/openlayers/vectors/geographic-epsg4326-vector-hover.html)
  * [Vector Tile Using Mapbox Style JSON](https://nasa-gibs.github.io/gibs-web-examples/examples/openlayers/vectors/geographic-epsg4326-vector-mapbox-styles.html)
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
* Maplibre GL
  * [Web Mercator (EPSG:3857)](https://nasa-gibs.github.io/gibs-web-examples/examples/maplibre-gl/webmercator-epsg3857.html)
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

or for hot-reload

```bash
npm install
npm run dev
```

Navigate your browser to http://localhost:3001.

Most examples show a single layer. Visit the
[GIBS Visualization Product Catalog](https://nasa-gibs.github.io/gibs-api-docs/available-visualizations/#visualization-product-catalog)
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

These examples use [OpenLayers](http://openlayers.org/) version 10.7.0.

If geometry transformations are required using coordinates in the polar systems,
[proj4js](http://trac.osgeo.org/proj4js), version 2, must be included. This
example uses proj4js version 2.20.2. This is not required to simply display the map.

#### Mapbox Vector Tile (MVT) Examples
[Mapbox Vector Tiles](https://docs.mapbox.com/vector-tiles/specification/) are available for some of the GIBS vector datasets. These Openlayers examples show how to style vector tiles using Openlayers styling classes, how to style vector tiles with the [Mapbox Styles](https://docs.mapbox.com/mapbox-gl-js/style-spec/) that are provided by GIBS in the [getCapabilities](https://gibs.earthdata.nasa.gov/wmts/epsg4326/std/wmts.cgi?request=GetCapabilities), and how to visualize feature data through map interactions. The Mapbox Style example uses [ol-mapbox-style](https://github.com/openlayers/ol-mapbox-style) version 13.1.1.

## Leaflet

This example uses [Leaflet](http://leafletjs.com) version 1.9.4.

To properly support the polar projections, the
[Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin must be
used. This example uses Proj4Leaflet version 1.0.1.

Gaps can sometimes be seen between the map tiles. Use the workaround found
here: https://github.com/Leaflet/Leaflet/issues/3575

## Cesium

This example uses [Cesium](http://cesiumjs.org/) version 1.102.

Use this
[GeographicTilingScheme](https://github.com/nasa-gibs/gibs-web-examples/blob/master/examples/cesium/gibs.js) when accessing the EPSG:4326 GIBS endpoint.

## Mapbox GL

This example uses [Mapbox GL](https://www.mapbox.com/help/define-mapbox-gl/) version 1.13.3.

## MapLibre GL

This example uses [MapLibre GL](https://maplibre.org/maplibre-gl-js-docs/api/) version 2.4.0.

## Bing

This example uses the [Bing Maps Control](https://msdn.microsoft.com/en-us/library/mt712542.aspx), version 8.

Bing requires and API key.
The key should be inserted [here](./examples/bing/webmercator-epsg3857.js#L25)

## Google Maps

This example uses the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial), version 3.

Google Maps requires an API key.
The key should be inserted [here](./examples/google/webmercator-epsg3857.html#L30)

## Questions

Send questions or comments to
[earthdata-support@nasa.gov](mailto:earthdata-support@nasa.gov)
