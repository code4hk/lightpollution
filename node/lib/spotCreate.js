var elasticsearch = require('elasticsearch');
var Q = require('q'); 
// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client();

// http://elasticsearch.github.io/elasticsearch-js/
//TODO requirejs in server side

var spotCreateService = {};

//assume light pollution spot now
//TODO refactor another layer
//TODO return promise as well

var _sanitizeSpot = function(spot) {
//server's responsbiliy to parse date time, for easier api creation
// 2013-11-30->unix timestamp
    return spot;
};

var _createSuccessResponse = function(resp) {
    return {
        id:resp.body._id
    };

};
var _createFailResponse = function(resp) {
    return {
            error: 'server fail',
            errorMessage:resp.body.error,
    };

};


/*
Suprisngly this promise dont support the short hand. use Q
*/
spotCreateService.createSpot = function(spot, cb) {
    //TODO
    var sanitizedSpot = _sanitizeSpot(spot);
    // index a document
    var indexPromise = Q(client.index({
        index: 'lightpollution',
        type: 'spot',
        body: sanitizedSpot,
    }));
    indexPromise.then(function(resp) {
        console.log('index success');
        console.log(resp);
        cb(null,_createSuccessResponse(resp));
    }).fail(function(resp){
        cb(new Error('server error'),_createFailResponse(resp));
    });
    console.log(indexPromise);


};

module.exports = spotCreateService;