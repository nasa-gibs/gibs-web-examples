/**
* GIBS Web Examples
*
* Copyright 2013 - 2015 United States Government as represented by the
* Administrator of the National Aeronautics and Space Administration.
* All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

window.onload = function() {

    config = {
        resolutions: {
            "250m": {
                tileMatrixSetID: "EPSG4326_250m",
                maximumLevel: 9
            },
            "500m": {
                tileMatrixSetID: "EPSG4326_500m",
                maximumLevel: 8
            },
            "1km": {
                tileMatrixSetID: "EPSG4326_1km",
                maximumLevel: 7
            },
            "2km": {
                tileMatrixSetID: "EPSG4326_2km",
                maximumLevel: 6
            }
        },
        layers: {
            OSM_Land_Water_Map: {
                id: "OSM_Land_Water_Map",
                resolution: "250m",
                format: "image/png"
            },
            MODIS_Terra_Aerosol: {
                id: "MODIS_Terra_Aerosol",
                resolution: "2km",
                format: "image/png",
                startDate: new Date(Date.UTC(2014, 4, 8))
            },
            MODIS_Terra_CorrectedReflectance_TrueColor: {
                id: "MODIS_Terra_CorrectedReflectance_TrueColor",
                resolution: "250m",
                format: "image/jpeg",
                startDate: new Date(Date.UTC(2014, 4, 8))
            },
            MODIS_Terra_Land_Surface_Temp_Day: {
                id: "MODIS_Terra_Land_Surface_Temp_Day",
                resolution: "1km",
                format: "image/png",
                startDate: new Date(Date.UTC(2014, 4, 8))
            },
            VIIRS_CityLights_2012: {
                id: "VIIRS_CityLights_2012",
                resolution: "500m",
                format: "image/jpeg"
            }
        },
        sets: [{
            name: "Visible Reflectance Only",
            layers: [
                "MODIS_Terra_CorrectedReflectance_TrueColor"
            ]
        },{
            name: "Aerosols",
            layers: [
                "MODIS_Terra_CorrectedReflectance_TrueColor",
                "MODIS_Terra_Aerosol"
            ]
        },{
            name: "Earth at Night 2012",
            layers: [
                "VIIRS_CityLights_2012"
            ]
        },{
            name: "Surface Temperature, Day",
            layers: [
                "MODIS_Terra_CorrectedReflectance_TrueColor",
                "MODIS_Terra_Land_Surface_Temp_Day"
            ]
        }]
    };

    gibs.Viewer(config);
};
