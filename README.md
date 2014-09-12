# gibs-web-examples

[![Build Status](https://travis-ci.org/nasa-gibs/gibs-web-examples.svg?branch=master)](https://travis-ci.org/nasa-gibs/gibs-web-examples)

This project shows how to use [GIBS](https://earthdata.nasa.gov/gibs) as a tile
source for
[OpenLayers](https://ol3js.org), [Leaflet](http://leafletjs.com), [Bing](http://www.bing.com/maps/), and [Google Maps](https://maps.google.com)

## Live Examples

* OpenLayers
 * [Geographic (EPSG:4326)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers3/geographic-epsg4326.html)
 * [Arctic (EPSG:3413)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers3/arctic-epsg3413.html)
 * [Antarctic (EPSG:3031)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers3/antarctic-epsg3031.html)
 * [Web Mercator (EPSG:3857)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers3/webmercator-epsg3857.html)
 * [Rolling Seven Day Slider](https://earthdata.nasa.gov/labs/gibs/examples/openlayers3/time.html)
* Leaflet
 * [Geographic (EPSG:4326)](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/geographic-epsg4326.html)
 * [Arctic (EPSG:3413)](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/arctic-epsg3413.html)
 * [Antarctic (EPSG:3031)](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/antarctic-epsg3031.html)
 * [Web Mercator (EPSG:3857)](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/webmercator-epsg3857.html)
 * [Rolling Seven Day Slider](https://earthdata.nasa.gov/labs/gibs/examples/leaflet/time.html)
* Bing
 * [Web Mercator (EPSG:3857)](https://earthdata.nasa.gov/labs/gibs/examples/bing/webmercator-epsg3857.html)
* Google Maps
 * [Web Mercator (EPSG:3857)](https://earthdata.nasa.gov/labs/gibs/examples/google/webmercator-epsg3857.html)
* OpenLayers 2
 * [Geographic (EPSG:4326)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/geographic-epsg4326.html)
 * [Arctic (EPSG:3413)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/arctic-epsg3413.html)
 * [Antarctic (EPSG:3031)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/antarctic-epsg3031.html)
 * [Web Mercator (EPSG:3857)](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/webmercator-epsg3857.html)
 * [Rolling Seven Day Slider](https://earthdata.nasa.gov/labs/gibs/examples/openlayers2/time.html)

## Overview

Clone the repository and open the index.html file in your browser.

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

[Worldview](https://github.com/nasa-gibs/worldview) is a web application that
uses GIBS as its primary image source.

## OpenLayers

This example uses [OpenLayers](http://openlayers.org/) version 3.0.0.

If geometry transformations are required using coordinates in the polar systems,
[proj4js](http://trac.osgeo.org/proj4js), version 1, must be included. This
example uses proj4js version 1.1.0. This is not required to simply display the map.

In ol.tilegrid.WMTS, there no way to add additional parameters (such as TIME) as was possible in OpenLayers 2. This requires overriding the tileUrlFunction and adding the parameter to the end of the URL string.

## Leaflet

This example uses [Leaflet](http://leafletjs.com) version 0.7.2.

To properly support the polar projections, the
[Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin must be
used. This example uses Proj4Leaflet version 0.7.0.

The version of [proj4js](http://trac.osgeo.org/proj4js) shipped with
Proj4Leaflet is too old and must be replaced with version 2.0.0.

GIBS now returns error codes if tiles are requested outside the tile matrix boundaries. This can cause Leaflet to throw exceptions with unexpected behavior. For EPSG:4326 and EPSG:3857, Leaflet will attempt to fetch out-of-bound tiles if the extents are set to the exact values defined for the projection.  Slightly reducing the extent will solve this problem (e.g., [-179.999, -89.999...]). For EPSG:3031 and EPSG:3431, it is not possible to restrict the extents as Leaflet assumes geographic points and it now necessary to monkey patch the tile routine. Improvements to projection handling is scheduled for Leaflet 0.8.

See: [https://github.com/kartena/Proj4Leaflet/issues/62](https://github.com/kartena/Proj4Leaflet/issues/62)

## Bing

This example uses the [Bing AJAX Control](http://msdn.microsoft.com/en-us/library/gg427610.aspx), version 7.

Excessive flickering is visible when using Google Chrome.

There is no straightforward way to restrict the zoom levels. GIBS returns a "Bad Request" response when over-zoomed for a layer.

See: [http://stackoverflow.com/questions/4327665/restrict-the-min-max-zoom-on-a-bing-map-with-v7-of-the-ajax-control](http://stackoverflow.com/questions/4327665/restrict-the-min-max-zoom-on-a-bing-map-with-v7-of-the-ajax-control)

## Google Maps

This example uses the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial), version 3.

## OpenLayers 2

This example uses [OpenLayers](http://openlayers.org/two) version 2.13.1.

Due to a bug in OpenLayers, shearing in the map may occur when using Internet
Explorer.

If geometry transformations are required using coordinates in the polar systems,
[proj4js](http://trac.osgeo.org/proj4js), version 1, must be included. This
example uses proj4js version 1.1.0. This is not required to simply display the map.

## Questions

Send questions or comments to
[support@earthdata.nasa.gov](mailto:support@earthdata.nasa.gov)
