'use strict';

define(
	["angular",
		"controllers/controllers",
		"services/services",
		"routes",
		"jquery.fileupload",
		"jquery.fileupload-angular",
		"elastic",
		"elastic-angular-client", "angular-bootstrap",
		"angular-route", "i18next", "ng-i18next", "jquery.cloudinary", "angular-leaflet"
	],
	// "Directives/directives",
	// "Filters/filters",

// $locationProvider.html5Mode(true).hashPrefix('!');
	// Services, Directives, Filters

	function BaseManager(angular, controllers, services, routes, blueimp_file_upload, _ejs, esAngularClient, angluar_route, _i18) {
		console.log(arguments)
		// ejs.client = ejs.jQueryClient('http://localhost:9200');

		var uploadUrl = "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload";
		//cannot detect the fields stuff options
		//duplicate info as form action target

		var initialize = function() {

			angular.module('jm.i18next').config(
				function($i18nextProvider) {
					//auto init , not necessary to call i18.init()
					$i18nextProvider.options = {
						lng: 'en-US',
						useCookie: false,
						useLocalStorage: false,
						fallbackLng: 'en-US',
						load:'current',
						// fallbackLng:false,
						resGetPath: '../locales/__lng__/translation.json'
					};

				}

			);

			//i18next is in app scope only  not controller
			//need it to compile even empty string

			// routes
			var app = angular.module('lightPollutionMap', ['ngRoute', 'elasticjs.service', 'ui.bootstrap', 'jm.i18next', 'blueimp.fileupload', 'leaflet-directive'])

			// services["spotService"]
			.config(['$provide', function($provide) {

				console.log('spotService');
				$provide.factory('spotService', ['$http','$q', services.spotService]);
			}])
			
				.config(routes)

			// 	.config(
			// 		function($i18nextProvider, $localeProvider) {
			// 			console.log(arguments);
			// 			console.log('init i18n');
			// 			console.log($localeProvider.$get().id);
			// 			// if(lng == "en-US") {
			// 			//        var en_us = require('static/locales/en-US/translation').translation;
			// 			//        res = en_us;
			// 			//    } else {
			// 			//        var zh_tw = require('static/locales/zh_TW/translation').translation;
			// 			//        res = zh_tw;
			// 			//    }

			// 			// $locale

			// 		}
			// )

			.config([
				'$httpProvider', 'fileUploadProvider',
				function($httpProvider, fileUploadProvider) {
					delete $httpProvider.defaults.headers.common['X-Requested-With'];
					fileUploadProvider.defaults.redirect = window.location.href.replace(
						/\/[^\/]*$/,
						'/cors/result.html?%s'
					);
					// Demo settings:
					angular.extend(fileUploadProvider.defaults, {
						// Enable image resizing, except for Android and Opera,
						// which actually support image resizing, but fail to
						// send Blob objects via XHR requests:
						disableImageResize: /Android(?!.*Chrome)|Opera/
							.test(window.navigator.userAgent),
						maxFileSize: 5000000,
						acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
					});
				}
			])

			.controller('MainCtrl', controllers.MainCtrl, ['$scope', '$routeParams', '$modal', '$timeout'])
				.controller('NavCtrl', controllers.NavCtrl)
				.controller('UploadImageCtrl', controllers.UploadImageCtrl)
				.controller('CarouselDemoCtrl', controllers.CarouselDemoCtrl)
				.controller('SpotsCtrl', controllers.SpotsCtrl, ['$scope', '$routeParams'])
				.controller('SpotsDetailsCtrl', controllers.SpotsDetailsCtrl)
				.controller('AddSpotCtrl', controllers.AddSpotCtrl, ['$scope', '$location', '$modal'])
				.controller('MapCtrl', controllers.MapCtrl)

			.controller('ModalInstanceCtrl', controllers.ModalInstanceCtrl)
				.controller('QuerySearchCtrl', controllers.QuerySearchCtrl)



			.controller('DemoFileUploadController', [
				'$scope', '$http', '$filter', '$window', 'cloudinary',
				function($scope, $http, $filter, $window, $cloudinary) {
					console.log('args');
					console.log(arguments);
					$scope.options = {
						url: uploadUrl
					};
					// if (!isOnGitHub) {
					// 	$scope.loadingFiles = true;
					// $http.get(uploadUrl)
					// 	.then(
					// 		function(response) {
					// 			$scope.loadingFiles = false;
					// 			$scope.queue = response.data.files || [];
					// 		},
					// 		function() {
					// 			$scope.loadingFiles = false;
					// 		}
					// );
					// }
					// cloudinary_fileupload
					console.log('ctrl');
					console.log($cloudinary);

					//auto trigger $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();


					$scope.startUploadFile = function() {
						console.log('start upload file');

						console.log('file:');
						console.log($scope.file);
						console.log($scope.submit);
						// $scope.submit();

						var tags = null;
						$cloudinary.getUploadAttrs(tags, function(data) {
							// data.uploadDone = function(e, cloudinaryResponse) {
							// 	console.log('cloudinaryResponse goes here');
							// 	// custom processing to save the new cloudinary ID goes here...
							// };

							// //send this data by post
							data.uploadStart = function(e, response) {
								console.log('start')
							};
							data.uploadDone = function(e, response) {
								console.log('done')
							};

							$scope.cloudinaryData = data;


							// 
							//not yet populate
							//escape it!


							//suppose the cloudinary js will populate those values and call file_uload to set stuff
							// $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload({formData:data});

							// $("#fileupload").data(data);
							// $("#fileupload").attr('data-form-data',data);
							$("#fileupload").data("form-data", data);
							$("#fileupload").data("data-form-data", data);
							$("#fileupload").attr('data-form-data', data);

							$("#fileupload").attr('data-form-data', JSON.stringify(data));
							// JSON.stringify(data);
							console.log($("#fileupload").attr('data-form-data'));
							//override to select better, not input

							// $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload(data);

							console.log('data:');
							console.log(data);
							$scope.submit();
						});

					}


				}
			])

			.controller('FileDestroyController', [
				'$scope', '$http',
				function($scope, $http) {
					var file = $scope.file,
						state;
					if (file.url) {
						file.$state = function() {
							return state;
						};
						file.$destroy = function() {
							state = 'pending';
							return $http({
								url: file.deleteUrl,
								method: file.deleteType
							}).then(
								function() {
									state = 'resolved';
									$scope.clear(file);
								},
								function() {
									state = 'rejected';
								}
							);
						};
					} else if (!file.$cancel && !file._index) {
						file.$cancel = function() {
							$scope.clear(file);
						};
					}
				}
			])

			.factory('cloudinary', function($http) {
				return {
					'getUploadAttrs': function(tags, cb) {
						console.log('requesting signature');

						//order sorted here
						//optional : public id. 
						//not specify=> generate by cloudinary
						$http.get('/image/sign', {
							params: {
								// 'timestamp': new Date().getTime(),
								'tags': tags
							}
						})
							.success(function(data, status) {
								if (status == 200) {
									console.log('req success');
									cb(data);
								}
							}).
						error(function(data, status, headers, config) {
							alert(status + " | bad");
						});
					}
				}
			})

			.directive('searchAutocomplete', function() {
				$scope.doGetAutocomplete = function(request, response) {
					$scope.coxitoautocomplete.get({
							MaxSuggestions: '5',
							UserQuery: $scope.coxitoSearchParameter
						},
						function(data) { // success
							response(data.Suggestions);
						},
						function(data) { // failure
							console.log("Add error handling");
						}
					);
				};
				return {
					restrict: 'E',
					replace: true,
					transclude: true,
					template: '<input id="search-box" type="text" class="search-query" placeholder="{{\'nav.search\' | i18next}}" ng-model="queryString">',
					link: function(scope, element, attrs) {
						scope.$watch(attrs.list, function(value) {
							element.autocomplete({
								source: value,
								select: function(event, ui) {
									scope[attrs.selection] = ui.item.value;
									scope.$apply();
								}
							});
						});
					}
				};
			})
				.run(function() {
					console.log('app running');
				})


				
			// )
			//no ng-app
			angular.bootstrap(document, ["lightPollutionMap"]);
		};
		return {
			initialize: initialize
		};
	});


// http://code.angularjs.org/1.0.2/i18n/angular-locale_zh-hk.js