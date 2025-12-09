/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.136.0
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as u}from"./chunk-CYZH6ZIM.js";import"./chunk-YMJY54J4.js";import"./chunk-OUPSOZ4F.js";import{a as f}from"./chunk-ILB4KG4E.js";import"./chunk-VJHOZLST.js";import"./chunk-RNCQLKJ3.js";import"./chunk-NPKIHRIX.js";import"./chunk-33M5C4LG.js";import"./chunk-X2JOWFTB.js";import"./chunk-KIJM7B3H.js";import"./chunk-P44F6KLE.js";import"./chunk-GSMLTRAL.js";import"./chunk-XO2FNJZK.js";import"./chunk-CM5O7VPK.js";import"./chunk-IB27QQGF.js";import"./chunk-RGFEE67W.js";import"./chunk-KXT7EZPS.js";import"./chunk-ZIOQOCPQ.js";import"./chunk-SY2GINYP.js";import"./chunk-KCR7AORG.js";import"./chunk-QDJTHWTA.js";import"./chunk-2YWR3G22.js";import"./chunk-HTSQLHXI.js";import"./chunk-JDAHMWM5.js";function a(c,d){return u.createMesh(c).then(function(e){let t=e.vertices.buffer,r=e.indices.buffer,s=e.westIndicesSouthToNorth.buffer,o=e.southIndicesEastToWest.buffer,i=e.eastIndicesNorthToSouth.buffer,n=e.northIndicesWestToEast.buffer;return d.push(t,r,s,o,i,n),{verticesBuffer:t,indicesBuffer:r,vertexCountWithoutSkirts:e.vertexCountWithoutSkirts,indexCountWithoutSkirts:e.indexCountWithoutSkirts,encoding:e.encoding,westIndicesBuffer:s,southIndicesBuffer:o,eastIndicesBuffer:i,northIndicesBuffer:n}})}var T=f(a);export{T as default};
