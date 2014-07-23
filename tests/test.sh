curl -XPUT  http://localhost:9200/lightpollution/spot/_mapping -d '
{ 	"spot": {
			"_source": {
				"enabled": false
				},
				"properties": {
					"id": {
						"type": "string"
					},
					"name": {
						"type": "string"
					},
					"path": {
						"type": "string"
					},
					"mimeType": {
						"type": "string"
					},
					"provider": {
						"type": "string"
					}
				}
			}

}';

