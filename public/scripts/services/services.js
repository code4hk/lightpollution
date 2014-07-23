/*jshint globalstrict:true */
/*global angular:true */
'use strict';
define(
["angular", "elastic-angular-client", "elastic","services/spotService"], function(angular, elasticAngularClient,es,spotServiceFactory) {

	// return 

	angular.module('myServices', ['elasticjs.services']);


    // here used js import all services, then angular app.js to config.
    // another approach is to use angularjs to config by module here directly.

    var services ={};
    services["spotService"]=spotServiceFactory;

    return services;


               
                // }])

	// .filter('autocompleteHighlight', function() {

 //    function escapeRegexp(queryToEscape) {
 //      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
 //    }

 //    return function(matchItem, query) {
 //      return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : query;
 //    };
 //  });
	// ;



});