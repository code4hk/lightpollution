console.log('upload');

var spots = require('./expectedInput.json');
console.log(spots);

var request = require('request');
var targetUrl = 'http://localhost:9200/lightpollution/spot';

for(i=0;i<spots.length;i++){

console.log(i);

var json = spots[i];
request.post({
		url: targetUrl,
		json: json
	})

}
