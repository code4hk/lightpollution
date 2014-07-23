curl -XPOST 'http://localhost:9200/lightpollution/spot' -d '{
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
