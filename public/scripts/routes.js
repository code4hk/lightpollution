'use strict';
define(
    ["angular"], function(angular) {
        var routes = function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/abc', {
                    templateUrl: '/views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/uploadImage', {
                    templateUrl: '/views/uploadImage.html',
                    controller: 'UploadImageCtrl'
                })
                .when('/spots', {
                    templateUrl: '/views/spots.html',
                    controller: 'MainCtrl'
                })
                .when('/spots/:action', {
                    templateUrl: '/views/spots.html',
                    controller: 'MainCtrl'
                })
                .when('/map', {
                    templateUrl: '/views/map.html',
                    controller: 'MapCtrl'
                })

            .otherwise({
                redirectTo: '/spots'
            });

            $locationProvider.html5Mode(true);
        };

        return routes;
    });