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

var map;
function load()
{
    map = new ol.Map
    ({
        target: 'map',
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
            center: [294129.69440787693, 5911333.980362161],
            zoom: 6,
            minZoom: 5,
            maxZoom: 18
        })
    });
    map.addControl(new ol.control.MeasureLength({}));
    map.addControl(new ol.control.SearchEngine({}));
    map.addControl(new ol.control.ScaleLine());
}

Gp.Services.getConfig({
    callbackSuffix: '',
    serverUrl: 'autoconf.json',
    onSuccess: load
});

/* Print Function - send POST Data to the print page */

function print_function(){
    var view = map.getView();
    var center = view.getCenter();
    var orientation;
    if ($("input[value='landscape']").is(":checked"))
    {
        orientation = "landscape";
    }
    else
    {
        orientation = "portrait";
    }
    var params = {x: center[0],
                  y: center[1],
                  zoom: view.getZoom(),
                  orientation: orientation,
                  screen_resolution: screen_resolution
                 };
    var form = document.createElement("form");
    form.target = "_blank";    
    form.method = "POST";
    form.action = "print";

    for(var key in params)
    {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

/* Screen Resolution */

var div = $('<div style="width: 10cm;"></div>');
$("body").append(div);
var screen_resolution = 10 * div.width();
div.remove();

/* Ui */
$("#selectmenu").selectmenu({width: 75});
$("input[type='radio']").checkboxradio();
$("#zoom_1, #zoom_2").button();
$("#zoom_1").click(function(event){
    map.getView().setZoom(14.30);
});
$("#zoom_2").click(function(event){
    map.getView().setZoom(12.30);
});
$("#print-button").click(print_function);
