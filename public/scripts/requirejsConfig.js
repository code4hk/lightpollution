console.log('init requirejs config');
var require={
    "map": {
        "*": {
            "canvas-to-blob": "blueimp-canvas-to-blob",
            "leaflet": "leaflet-dist"
        }
    },
    "paths": {
        "angular": "../bower_components/angular/angular",
        "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min",
        "angular-cookies": "../bower_components/angular-cookies/angular-cookies",
        "angular-mocks": "../bower_components/angular-mocks/angular-mocks",
        "angular-resource": "../bower_components/angular-resource/angular-resource",
        "angular-sanitize": "../bower_components/angular-sanitize/angular-sanitize",
        "angular-scenario": "../bower_components/angular-scenario/angular-scenario",
        "jquery": "../bower_components/jquery/jquery",
        "elastic": "../bower_components/elastic.js/dist/elastic",
        "elastic-angular-client": "../bower_components/elastic.js/dist/elastic-angular-client",
        "angular-bootstrap": "../bower_components/angular-bootstrap/ui-bootstrap-tpls",
        "angular-animate": "../bower_components/angular-animate/angular-animate",
        "angular-route": "../bower_components/angular-route/angular-route",
        "i18next": "../bower_components/i18next/release/i18next-1.6.3.min",
        "ng-i18next": "../bower_components/ng-i18next/dist/ng-i18next",
        "angular-translate": "../bower_components/angular-translate/angular-translate",
        "blueimp-canvas-to-blob": "../bower_components/blueimp-canvas-to-blob/js/canvas-to-blob",
        "blueimp-tmpl": "../bower_components/blueimp-tmpl/js/tmpl",
        "jquery.ui.widget": "../bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget",
        "jquery.fileupload-angular": "../bower_components/blueimp-file-upload/js/jquery.fileupload-angular",
        "jquery.fileupload-audio": "../bower_components/blueimp-file-upload/js/jquery.fileupload-audio",
        "jquery.fileupload-image": "../bower_components/blueimp-file-upload/js/jquery.fileupload-image",
        "jquery.fileupload-process": "../bower_components/blueimp-file-upload/js/jquery.fileupload-process",
        "jquery.fileupload-ui": "../bower_components/blueimp-file-upload/js/jquery.fileupload-ui",
        "jquery.fileupload-validate": "../bower_components/blueimp-file-upload/js/jquery.fileupload-validate",
        "jquery.fileupload-video": "../bower_components/blueimp-file-upload/js/jquery.fileupload-video",
        "jquery.fileupload": "../bower_components/blueimp-file-upload/js/jquery.fileupload",
        "jquery.iframe-transport": "../bower_components/blueimp-file-upload/js/jquery.iframe-transport",
        "blueimp-helper": "../bower_components/blueimp-gallery/js/blueimp-helper",
        "blueimp-gallery": "../bower_components/blueimp-gallery/js/blueimp-gallery",
        "blueimp-gallery-fullscreen": "../bower_components/blueimp-gallery/js/blueimp-gallery-fullscreen",
        "blueimp-gallery-indicator": "../bower_components/blueimp-gallery/js/blueimp-gallery-indicator",
        "blueimp-gallery-video": "../bower_components/blueimp-gallery/js/blueimp-gallery-video",
        "load-image": "../bower_components/blueimp-load-image/js/load-image",
        "load-image-ios": "../bower_components/blueimp-load-image/js/load-image-ios",
        "load-image-orientation": "../bower_components/blueimp-load-image/js/load-image-orientation",
        "load-image-meta": "../bower_components/blueimp-load-image/js/load-image-meta",
        "load-image-exif": "../bower_components/blueimp-load-image/js/load-image-exif",
        "load-image-exif-map": "../bower_components/blueimp-load-image/js/load-image-exif-map",
        "leaflet-dist": "../bower_components/leaflet-dist/leaflet",
        "leaflet-plugin-google": "leaflet-plugins/layer/tile/Google",
        "angular-leaflet": "../bower_components/angular-leaflet/dist/angular-leaflet-directive",
        "jquery.cloudinary": "jquery.cloudinary",
        "jquery.ui.core": "../bower_components/jqueryui/ui/jquery.ui.core",
        "jquery.ui.datepicker": "../bower_components/jqueryui/ui/jquery.ui.datepicker",
        "jqueryui": "../bower_components/jqueryui/ui/jquery-ui"
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