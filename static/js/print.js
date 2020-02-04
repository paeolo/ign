/* Gp API */

var apiKey = '1nauevj9z9x6k1mj1pvnyll3';

var resolutions = [
    156543.03392804103,
    78271.5169640205,
    39135.75848201024,
    19567.879241005125,
    9783.939620502562,
    4891.969810251281,
    2445.9849051256406,
    1222.9924525628203,
    611.4962262814101,
    305.74811314070485,
    152.87405657035254,
    76.43702828517625,
    19.109257071294063,
    4.777314267823517,
    2.3886571339117584,
    1.1943285669558792,
    0.5971642834779396,
    0.29858214173896974,
    0.14929107086948493,
    0.07464553543474241
];

var matrixIds = ["0","1","2","3","4","5","6","7","8","9","10","11","13","15","16","17","18","19"];

var map = new ol.Map
({
    target: 'map',
    renderer: 'dom',
    layers: [
        new ol.layer.Tile({
            source : new ol.source.WMTS({
                url: 'https://wxs.ign.fr/' + apiKey + '/wmts',
                layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
                matrixSet: 'PM',
                format: 'image/jpeg',
                projection: 'EPSG:3857',
                tileGrid: new ol.tilegrid.WMTS({
                    origin: [-20037508, 20037508],
                    resolutions: resolutions,
                    matrixIds: matrixIds
                }),
                style: 'normal'
            })
        })
    ],
    view: new ol.View
    ({
        center: [x, y],
        zoom: zoom,
        minZoom: zoom,
        maxZoom: zoom
    })
});
var scaleLine = new ol.control.ScaleLine();
map.addControl(scaleLine);
