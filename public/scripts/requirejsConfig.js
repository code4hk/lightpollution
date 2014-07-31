console.log('init requirejs config');
var require={
    "map": {
        "*": {
            "canvas-to-blob": "blueimp-canvas-to-blob",
            "leaflet": "leaflet-dist"
        }
    },
    "paths": {
        "angular": "../lib/angular/angular",
        "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min",
        "angular-cookies": "../lib/angular-cookies/angular-cookies",
        "angular-mocks": "../lib/angular-mocks/angular-mocks",
        "angular-resource": "../lib/angular-resource/angular-resource",
        "angular-sanitize": "../lib/angular-sanitize/angular-sanitize",
        "angular-scenario": "../lib/angular-scenario/angular-scenario",
        "jquery": "../lib/jquery/jquery",
        "elastic": "../lib/elastic.js/dist/elastic",
        "elasticsearch":"../lib/elastic.js/dist/elastic",
        "elastic-angular-client": "../lib/elastic.js/dist/elastic-angular-client",
        "angular-bootstrap": "../lib/angular-bootstrap/ui-bootstrap-tpls",
        "angular-animate": "../lib/angular-animate/angular-animate",
        "angular-route": "../lib/angular-route/angular-route",
        "i18next": "../lib/i18next/i18next.amd.min",
        "ng-i18next": "../lib/ng-i18next/dist/ng-i18next",
        "angular-translate": "../lib/angular-translate/angular-translate",
        "blueimp-canvas-to-blob": "../lib/blueimp-canvas-to-blob/js/canvas-to-blob",
        "blueimp-tmpl": "../lib/blueimp-tmpl/js/tmpl",
        "jquery.ui.widget": "../lib/blueimp-file-upload/js/vendor/jquery.ui.widget",
        "jquery.fileupload-angular": "../lib/blueimp-file-upload/js/jquery.fileupload-angular",
        "jquery.fileupload-audio": "../lib/blueimp-file-upload/js/jquery.fileupload-audio",
        "jquery.fileupload-image": "../lib/blueimp-file-upload/js/jquery.fileupload-image",
        "jquery.fileupload-process": "../lib/blueimp-file-upload/js/jquery.fileupload-process",
        "jquery.fileupload-ui": "../lib/blueimp-file-upload/js/jquery.fileupload-ui",
        "jquery.fileupload-validate": "../lib/blueimp-file-upload/js/jquery.fileupload-validate",
        "jquery.fileupload-video": "../lib/blueimp-file-upload/js/jquery.fileupload-video",
        "jquery.fileupload": "../lib/blueimp-file-upload/js/jquery.fileupload",
        "jquery.iframe-transport": "../lib/blueimp-file-upload/js/jquery.iframe-transport",
        "blueimp-helper": "../lib/blueimp-gallery/js/blueimp-helper",
        "blueimp-gallery": "../lib/blueimp-gallery/js/blueimp-gallery",
        "blueimp-gallery-fullscreen": "../lib/blueimp-gallery/js/blueimp-gallery-fullscreen",
        "blueimp-gallery-indicator": "../lib/blueimp-gallery/js/blueimp-gallery-indicator",
        "blueimp-gallery-video": "../lib/blueimp-gallery/js/blueimp-gallery-video",
        "load-image": "../lib/blueimp-load-image/js/load-image",
        "load-image-ios": "../lib/blueimp-load-image/js/load-image-ios",
        "load-image-orientation": "../lib/blueimp-load-image/js/load-image-orientation",
        "load-image-meta": "../lib/blueimp-load-image/js/load-image-meta",
        "load-image-exif": "../lib/blueimp-load-image/js/load-image-exif",
        "load-image-exif-map": "../lib/blueimp-load-image/js/load-image-exif-map",
        "leaflet-dist": "../lib/leaflet-dist/leaflet",
        "leaflet-plugin-google": "leaflet-plugins/layer/tile/Google",
        "angular-leaflet": "../lib/angular-leaflet/dist/angular-leaflet-directive",
        "jquery.cloudinary": "jquery.cloudinary",
        "jquery.ui.core": "../lib/jqueryui/ui/jquery.ui.core",
        "jquery.ui.datepicker": "../lib/jqueryui/ui/jquery.ui.datepicker",
        "jqueryui": "../lib/jqueryui/ui/jquery-ui"
    },
    "shim": {
        "jquery": {
            "exports": "$"
        },
        "jquery.ui.widget": {
            "deps": [
                "jquery"
            ]
        },
        "angular": {
            "exports": "angular"
        },
        "angular-mocks":{
            "deps":["angular"]
        },
        "elastic-angular-client": {
            "deps": [
                "angular"
            ],
            "exports": "angular"
        },
        "angular-bootstrap": {
            "deps": [
                "angular"
            ]
        },
        "angular-route": {
            "deps": [
                "angular"
            ]
        },
        "i18next": {
            "exports": "i18n"
        },
        "ng-i18next": {
            "deps": [
                "angular",
                "i18next"
            ]
        },
        "jquery.ui.core": {
            "deps": [
                "jquery"
            ]
        },
        "jquery.ui.datepicker": {
            "deps": [
                "jquery.ui.core"
            ]
        },
        "jquery.fileupload": {
            "deps": [
                "jquery",
                "canvas-to-blob"
            ]
        },
        "jquery.fileupload-angular": {
            "deps": [
                "jquery",
                "jquery.fileupload",
                "angular"
            ]
        },
        "jquery.cloudinary": {
            "deps": [
                "jquery",
                "jquery.fileupload"
            ]
        },
        "leaflet": {
            "exports": "L"
        },
        "angular-leaflet": {
            "deps": [
                "angular",
                "leaflet"
            ]
        },
        "leaflet-plugin-google": {
            "deps": [
                "leaflet"
            ]
        }
    },
    "baseUrl": "scripts"
//why scripts not scripts?
};