/*
    This js file contains all MAP relevant methods and functionaity

*/

var map = null;
var query;
var BingCredentials = 'AtdyANbNx4YvPqhZ8IvGI_CVl_A9umcPC9A9ab5sBssP614co2IRA0AqoJqEaiJc';


function getMap() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), { credentials: BingCredentials });
}

function callSearchService(credentials) {
    var searchRequest = 'https://dev.virtualearth.net/REST/v1/Locations/' + query + '?output=json&jsonp=searchServiceCallback&key=' + credentials;
    var mapscript = document.createElement('script');
    mapscript.type = 'text/javascript';
    mapscript.src = searchRequest;
    document.getElementById('myMap').appendChild(mapscript)
}

function searchServiceCallback(result) {


    if (result &&
    result.resourceSets &&
    result.resourceSets.length > 0 &&
    result.resourceSets[0].resources &&
    result.resourceSets[0].resources.length > 0) {
        //resultsHeader.innerHTML = "Bing Maps REST Search API  <br/>  Found location " + result.resourceSets[0].resources[0].name;
        var bbox = result.resourceSets[0].resources[0].bbox;
        var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(bbox[0], bbox[1]), new Microsoft.Maps.Location(bbox[2], bbox[3]));
        map.setView({ bounds: viewBoundaries });
        var location = new Microsoft.Maps.Location(result.resourceSets[0].resources[0].point.coordinates[0], result.resourceSets[0].resources[0].point.coordinates[1]);
        var pushpin = new Microsoft.Maps.Pushpin(location);
        map.entities.push(pushpin);
    }
    else {
        if (typeof (response) == 'undefined' || response == null) {
            showMessages("Invalid credentials or no response");
        }
        else {
            if (typeof (response) != 'undefined' && response && result && result.errorDetails) {
                showMessages("Message :" + response.errorDetails[0]);
            }
            showMessages("No results for the query");

        }
    }


}