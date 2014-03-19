gibs-web-examples
=================

This project shows how to use [GIBS](https://earthdata.nasa.gov/gibs) as a tile
source for [OpenLayers 2](http://openlayers.org) and
[Leaflet](http://leafletjs.com).

Live Examples
-------------

* OpenLayers 2
 * [Geographic (EPSG:4326)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/geographic-epsg4326.html)
 * [Arctic (EPSG:3413)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/arctic-epsg3413.html)
 * [Antarctic (EPSG:3031)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/antarctic-epsg3031.html)
 * [Web Mercator (EPSG:3857)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/webmercator-epsg3857.html)
* Leaflet
 * [Geographic (EPSG:4326)](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/geographic-epsg4326.html)
 * [Arctic (EPSG:3413)](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/arctic-epsg3413.html)
 * [Antarctic (EPSG:3031)](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/antarctic-epsg3031.html)
 * [Web Mercator (EPSG:3857)](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/webmercator-epsg3857.html)

Overview
--------
Clone the repository and open the index.html file in your browser.

All examples show a single layer, Corrected Reflectance. Visit the
[GIBS Available Imagery Products](https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+Available+Imagery+Products)
for parameters needed to display other layers.

All examples use a single day. For Earth observing layers, use the TIME parameter to select any day in the archive from May 8, 2012 to today.

[Worldview](https://earthdata.nasa.gov/worldview) is a web application that
uses GIBS as its primary image source.

OpenLayers 2
------------
This example uses [OpenLayers](http://openlayers.org) version 2.13.1.

Due to a bug in OpenLayers, shearing in the map may occur when using Internet
Explorer.

To properly support the polar projections,
[proj4js](http://trac.osgeo.org/proj4js), version 1, must be included. This
example uses proj4js version 1.1.0.

Leaflet
-------
This example uses [Leaflet](http://leafletjs.com) version 0.7.2.

To properly support the polar projections, the
[Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin must be
used. This example uses Proj4Leaflet version 0.7.0.

The version of [proj4js](http://trac.osgeo.org/proj4js) shipped with
Proj4Leaflet is too old and must be replaced with version 2.0.0.

Questions
---------
Send questions or comments to
[support@earthdata.nasa.gov](mailto:support@earthdata.nasa.gov)
