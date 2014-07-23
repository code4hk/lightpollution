/*
 * This service allows invoking back end nodejs to proxy for create/edit spots to elasticsearch.
 *
 */

'use strict';
define(
    ["angular"], function(angular) {

        var spotServiceFactory = function($http, $q) {
            var _service = {};

            _service.createSpot = function() {

                var failCb = function() {
                    console.log('create spot failed. reason:...');
                };
                var successCb = function(data, status, headers, config) {

                    
                    var createFail = true;
                    if (createFail) {
                        createSpotDeferred.reject('server fail');
                    }
                    createSpotDeferred.resolve('create node success');
                };

                //TODO no err propgation in $q, refactor with Q later

                var createSpotDeferred = $q.defer();

                var createSpotHttpPromise = $http({
                    method: 'POST',
                    url: '/api/spot/add'
                }).success(successCb)
                    .error(function() {
                        console.log('error');
                        createSpotDeferred.reject();
                    })

                return createSpotDeferred.promise;
                //use finally to catch both error


                //factory function body that constructs shinyNewServiceInstance
            };

            return _service;
        };
        return spotServiceFactory;

    });