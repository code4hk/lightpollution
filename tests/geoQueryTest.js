var ejs = require('elastic.js'),
	nc = require('elastic.js/elastic-node-client');

// var ejs = ejsResource('http://localhost:9200/lightpollution');
var fieldsToReturn = ["location"];


ejs.client = nc.NodeClient('localhost', '9200');

var query = ejs.MatchAllQuery();

var lat = 22.30223941076033;
var lng = 114.17551159858702;

var point = ejs.GeoPoint().properties({
	lat: lat,
	lon: lng
});
var sortCriteria = ejs.Sort().field('location').geoDistance(point).unit("km").asc().mode("avg").distanceType("arc");

var r = ejs.Request()
	.sort(sortCriteria)
	.fields(fieldsToReturn)
	.query(query)
r.doSearch(function(results) {
	
	var spots = results.hits.hits;
	console.log(spots);

	for (i = 0; i < spots.length; i++) {
		console.log(spots[i].sort);
		console.log(spots[i].fields);
	}
	// console.log(spots);
});