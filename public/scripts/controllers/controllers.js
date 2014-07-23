'use strict';
define(
	["angular", "jquery", "underscore", "leaflet-plugin-google", "jquery.ui.datepicker"], function(angular, _$, __) {
		console.log("underscore" + _);
		var controllers = {};
		controllers.MainCtrl = function($scope, $routeParams, $locale, $modal, $timeout, $location) {

			$scope.displayAddedSpot = function(spot) {
				//done by visibility
			};
			$scope.openAddModal = function() {

				var modalInstance = $modal.open({
					templateUrl: '/views/add.html',
					controller: 'AddSpotCtrl',
					// resolve: {
					// 	// items: function() {
					// 	// 	return $scope.items;
					// 	// }
					// }
				});

				//only when modal ready, prmoise resolve
				//why still same event loop and before load finish??
				modalInstance.opened.then(function() {
					//possible for touch only
					// Modernizr.touch &&
					if (!Modernizr.inputtypes.date) {
						//why not ready
						console.log('use jquery');
						//did fix the issues..
						$timeout(function() {
							$('input[type=date]').datepicker()
						}, 0);

					} else {
						console.log('use HTML5!');
					}

				});



				// modalInstance.result.then(function(selectedItem) {
				// 	$scope.selected = selectedItem;
				// }, function() {
				// 	$log.info('Modal dismissed at: ' + new Date());
				// });
			};
			console.log('Main Ctrl' + $routeParams.action);
			if ($routeParams.action === 'add') {
				console.log('add new spots');
				$scope.openAddModal();
			} else {
				console.log('list spots');
			}

		};
		controllers.AddSpotCtrl = function($scope, $location, $modalInstance) {

			$scope.spotAdded = false;
			$scope.spotToSubmit = {};
			var submitCb = function() {
				console.log('modal closed');
			};
			var dismissCb = function() {
				$location.path('/spots');
			};
			$scope.cancel = function() {
				console.log('modal dismissed');
				$modalInstance.dismiss('cancel');
			};

			$modalInstance.result.then(submitCb, dismissCb);

			//scope in form is isolated. $scope.spot is empty
			$scope.ok = function(spot) {
				console.log(spot);
				$scope.spotToSubmit = angular.copy(spot);
				console.log($scope.spotToSubmit);
				// $modalInstance.close($scope.selected.item);



			};

			$scope.successAndDismiss = function() {};
			// //success
			// $scope.spotAdded=true;
			// //auto dismiss. or add other spot
			//change modal, hide form after success
		};

		controllers.MapCtrl = function($scope, $rootScope, $locale) {

			//only when DOM ready? or 
			angular.extend($scope, {
				defaults: {
					scrollWheelZoom: false,
					maxZoom: 18
				},
				center: {
					lat: 22.298,
					lng: 114.151,
					zoom: 12
				},
				layers: {
					baselayers: {
						googleRoadmap: {
							name: 'Google Streets',
							layerType: 'ROADMAP',
							type: 'google'
						},
						googleTerrain: {
							name: 'Google Terrain',
							layerType: 'TERRAIN',
							type: 'google'
						},
						googleHybrid: {
							name: 'Google Hybrid',
							layerType: 'HYBRID',
							type: 'google'
						}
					}
				},
				markers: {
					dummy1: {
						lat: 22.288,
						lng: 114.113,
						message: "This is Madrid. But you can drag me to another position",
					}
				}
			});


			$scope.$watch('spots', function(spots) {

				console.log('spots changed ');

				console.log("in map ctrl");
				console.log($scope.spots);


				//validate spots correct


				$scope.markers = _.chain($scope.spots).filter(function(spot) {

					return !!spot && !! spot.location;
				}).map(function(spot) {
					return {
						title: spot.title,
						lat: spot.location.lat,
						lng: spot.location.lng
					}
				}).value();

				console.log($scope.markers);
			}, true);

			//repalce spots vars


		};

		controllers.QuerySearchCtrl = function($scope, $modal, ejsResource, $log) {

			$scope.queryString = '';
			$scope.results = []; //future result not only spots

			function searchByQueryString(queryString) {
				var ejs = ejsResource('http://localhost:9200/lightpollution');
				var query = ejs.QueryStringQuery($scope.queryString);

				var fieldsToReturn = ["title", "desc", "captureDate", "uploadDate", "image_url", "locationArea", "locationDesc", "uploader"];
				var querySearchCallback = function(results) {
					console.log('hit:' + results.hits.total);
					$scope.spotsHits = results.hits.hits;
					$scope.spots = _.map($scope.spotsHits, function(spotsHit) {
						return spotsHit.fields
					});
					console.log($scope.spots);

					$scope.results = $scope.spots;

				};

				//watch for criteria and trigger search
				var r = ejs.Request()
					.fields(fieldsToReturn)
					.query(query)
				r.doSearch(querySearchCallback);

			}

			$scope.$watch('queryString', function(queryString) {
				searchByQueryString(queryString);

			}, true); // initialize the watch
			$scope.items = ['item1', 'item2', 'item3'];


		};

		controllers.NavCtrl = function($scope, $locale, $i18next) {

			$scope.changeLng = function(lng) {
				console.log('lng' + lng);
				//$local
				$locale = lng;
				// 'i18nextOptions' is watched
				$i18next.options.lng = lng;
			};

			console.log('controller');
			console.log($locale);
			$scope.world = "World";
		}


		controllers.CarouselDemoCtrl = function($scope) {
			$scope.myInterval = 5000;
			//take percedence according to language
			//TODO use option to force the lang, instead of adding eng to chinese file

			var zhSlide = {
				image: '/images/bg.jpg',
				text: 'header1.title',
				desc: 'header1.desc',
				actionHref: '/lightpollution',
				actionDesc: 'header1.actionDesc'
			};
			var engSlide = {
				image: '/images/bg.jpg',
				text: 'header2.title',
				desc: 'header2.desc',
				actionHref: '/lightpollution',
				actionDesc: 'header1.actionDesc'
			}
			// <a class="btn btn-large btn-primary" href="/lightpollution">了解光污染</a>
			var slides = $scope.slides = [zhSlide, engSlide

			];
			// 	slides.push({
			// 		image: 'http://placekitten.com/' + newWidth + '/200',
			// 		text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
			// 	});
			// };
		};


		controllers.UploadImageCtrl = function($scope) {

			$scope.title = "a p";
		}
		controllers.SpotsDetailsCtrl = function($scope, ejsResource) {

			console.log("in details");
			console.log($scope.spots);

			// $scope.$on('spots', function(event, args) {
			// 	console.log('details: spots:')
			// 	console.log(args.spots);
			//        // $scope.message2 = 'ONE: ' + args.spots;
			//    });  

		}

		//parent for details & Map

		controllers.SpotsCtrl = function($scope, $routeParams, ejsResource) {
			console.log($routeParams);



			var ejs = ejsResource('http://localhost:9200/lightpollution');
			//case of server is down

			$scope.showByLocation = function(lat, lng) {
				//lets search by lat and lng here
				console.log('Rank spots by locatino close to lat:' + lat + 'lng:' + lng);

				searchByLocation(lat, lng);


			}

			var searchByLocation = function(lat, lng) {

				$scope.sortCriteria = sortByAscGeoLocation(lat, lng);
				searchSpots();


				// 		var query
				// // = ejs.QueryStringQuery('');
				// = ejs.MatchAllQuery();

				// var r = ejs.Request().filter(ejs.TypeFilter('spot'));

				// 		r = r.sort(ejs.Sort().asc().field('captureDate'))

				// 	//watch for criteria and trigger search
				// 	r = r.fields(fieldsToReturn)
				// 		.query(query)
				// 	r.doSearch(spotsCallback);


			}

			// ejs.Sort().asc().field('captureDate');

			// 
			var query
			// = ejs.QueryStringQuery('');
			= ejs.MatchAllQuery();

			// var query = ejs.FieldQuery("spot.desc", 'light');

			var fieldsToReturn = ["title", "desc", "captureDate", "uploadDate", "image_url", "locationArea", "locationDesc", "uploader", "location"];

			var spotsCallback = function(results) {
				console.log('Search results back from ES:');
				console.log(results);

				$scope.spotsHits = results.hits.hits;
				$scope.spots =
					_.chain($scope.spotsHits).filter(function(spot) {
						return spot != null && !!spot.fields;
					}).map(function(spot) {
						return spot.fields;
					}).value();



				console.log($scope.spots);


				// $scope.$broadcast('spots', $scope.spots); 

			}

			console.log(ejs.Request());
			$scope.sortCriteria = null;
			// must be string, Sort, or array

			//working

			function searchSpots() {
				var r = ejs.Request().filter(ejs.TypeFilter('spot'));

				if ($scope.sortCriteria) {
					r = r.sort($scope.sortCriteria)
				}

				//watch for criteria and trigger search
				r = r.fields(fieldsToReturn)
					.query(query)
				r.doSearch(spotsCallback);


			}

			function sortByAscCaptureDate() {
				return ejs.Sort().asc().field('captureDate');
			}

			function sortByAscGeoLocation(lat, lng) {
				console.log("sort:" + lat + ":" + lng);
				// use spot.location
				//bug mix up lat and lng in geopoint?
				return ejs.Sort().field('location').geoDistance(ejs.GeoPoint().properties({
					lat: lat,
					lon: lng
				})).unit("km").asc();
			}



			var getSpots = function() {
				//elasticsearch api here
			}


			$scope.showByTime = function() {
				// console.log('Load latest 10 spots');
				console.log('set mode to load for scrolling');
				$scope.sortCriteria = sortByAscCaptureDate();

				searchSpots();
			}

			function init() {
				searchSpots();

			}
			init();
		};

		// controllers.ModalInstanceCtrl = function($scope, $modalInstance, items) {

		// 	$scope.items = items;
		// 	$scope.selected = {
		// 		item: $scope.items[0]
		// 	};

		// 	$scope.ok = function() {
		// 		$modalInstance.close($scope.selected.item);
		// 	};

		// 	$scope.cancel = function() {
		// 		$modalInstance.dismiss('cancel');
		// 	};
		// };

		return controllers;

	});