
##Expected input
curl -XPOST 'http://localhost:9200/lightpollution/spot'
-d 
'{
	"title": "Issue of light",
	"desc": "Serious light pollution at 3am",
	"locationArea": "HK Island",
	"locationDesc": "HK Island",
	"locationX": 100,
	"locationY": 200,
	"captureDate": 1381918000,
	"uploadDate":1381908000,
	"uploader": "tester1",
	"type": "lightspot",
	"newAge":true
}'

##Delete everything and start over
curl -XDELETE http://localhost:9200/lightpollution

##Create Index
curl -XPOST  http://localhost:9200/lightpollution -d '{}'


curl -XPOST  http://localhost:9200/lightpollution/news -d '{}'

#mapping
curl -XPUT  http://localhost:9200/lightpollution/news/_mapping -d '{
	"news":
	{
		"properties": 
		{
			"content":{
				type:"string"
			}
		}
	}
}'



##Put up mapping
curl -XPUT  http://localhost:9200/lightpollution/spot/_mapping -d '{
	"spot": {
		"_source": {
			"enabled": true
		},
		"properties": {
			"id": {
				"type": "string"
			},
			"name": {
				"type": "string"
			},
			"location":{
				"type":"geo_point"
			},
			"path": {
				"type": "string"
			},
			"mimeType": {
				"type": "string"
			},
			"provider": {
				"type": "string"
			},
			"image_url":{
				"type":"string",
				"_source" : {"enabled" : false}
			}
		}
	}

}';

curl -XPOST http://localhost:9200/lightpollution/news -d '{
	"date":1382106429,
	"content":"The Hong Kong SAR government is now conducting a public consultation on light pollution."
}'


curl -XPOST http://localhost:9200/lightpollution/news -d '{
	"date":1382106357000,
	"content":"本人認為香港光污染問題嚴重，必需立法監管促請政府立法，正視光污染!"
}'

curl -XPOST http://localhost:9200/lightpollution/news -d '{
	"author":"vincent"
}'



##Upload spots
curl -XPOST http://localhost:9200/lightpollution/spot -d '{
	"title": "DBS Building",
	"desc": "Large Parsma TV",
	"locationArea": "Kowloon",
	"locationDesc": "ABC Street",
	"location": {
		"lat": 22.28283221646124,
		"lng": 114.15834546089172
	},
	"captureDate": 1382155112000,
	"uploadDate": 1382154048000,
	"uploader": "Thomas",
	"type": "lightspot",
	"image_url": "20130414_233454_gxq3ao.jpg"
}'


#Search by time filter
curl -XPOST http://localhost:9200/lightpollution/spot/_search -d '{
	"fields" :["_source"],
	"query" : {
		"match_all":{}
	},
	"filter" : {
		"range" : {
			"captureDate" : {
				"gte":1382112000000 
			}
		}
	}
}'


#1365936000000
p

##does the magic

#Search for HK
http://localhost:9200/lightpollution/news/_search?q=Hong
#Stop words get filtered
http://localhost:9200/lightpollution/news/_search?q=The
#"Local Language"
http://localhost:9200/lightpollution/news/_search?q=%E5%85%89%E6%B1%A1%E6%9F%93


curl -XPOST  http://localhost:9200/lightpollution/news/_mapping -d '{
	"news":{

	}

}'


http://localhost:9200/lightpollution/


curl -XPOST  http://localhost:9200/lightpollution -d '{}'




#demo by url not necessary



http://slid.es/chunyinvincentlau/elastic-search



{

	a:"b"
	
}
