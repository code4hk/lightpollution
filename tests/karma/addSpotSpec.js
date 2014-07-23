//Focus on client side behaviour. but that is for e2e test?

//4 layers of testing are too much
//n odejs layer testing response, validation at server side
//this angularjs service layer, testing behaviour of service (i.e. promises & error handling)
//controller behaviour <- more meaningful, need mock up http or just service?
//web automation testing

define(['chai', 'app', 'angular', 'angular-mocks'], function(chai, App, angular) {
    var assert = chai.assert;
    var expect = chai.expect;

    App.initialize();

//Merging controller and service testing into one?
describe('add spot Controller and services', function() {

});
    describe('add spot sevices', function() {
        //how to get angular mock here?used reqreuijs
        this.timeout(5000);
        console.log('module');


        // You need to load modules that you want to test,
        // it loads only the "ng" module by default.
        beforeEach(module('lightPollutionMap'));
        //run only if inside && not angular.module why/

        var $httpBackend = null;
        var spotService = null;

        var mockSpotCreateResponse = function(spot, transform) {
            var transformed = spot;

            transformed["id"] = 1;
            return transformed;
            //with transform + original
        };

        beforeEach(inject(function($injector, _spotService_) {
            // Set up the mock http service responses
            console.log('injecting');
            $httpBackend = $injector.get('$httpBackend');
            spotService = _spotService_;
            // backend definition common for all tests


        }));


        it('post successful', inject(function($http, $controller) {

            //trigger the post 
            console.log(arguments);
            var $scope = {};


            var mockInputSpot = {
                "title": "Light pollution issue",
                "locationDesc": "Hong Kong Island",
                "description": "Serious",
                "captureDate": "2013-12-30",
                "captureTime": "23:58",
                "uploader": "Tester"
            };

            console.log(App);
            //resp + resp from ES
            $httpBackend.when('POST', '/api/spot/add').respond(mockSpotCreateResponse(mockInputSpot));

            var createSpotPromise = spotService.createSpot(mockInputSpot);
            createSpotPromise.then(function(res) {
                //error
                // assert id
                assert.equal(res.id, 1);

                //assert controllers. Better done in another layer

                var addSpotCtrl = $controller('AddSpotCtrl', {
                    $scope: $scope
                });

                // AddSpotCtrl true
                // addSpotCtrl.displayAddedSpot();
                // successAndDismiss


            }).
            catch (function(res) {
                assert.equal(res, 'server fail');
            });

            // console.log(msg);
        }));
        it('post fail', function(done) {
            inject(function($rootScope) {
                var spotCreatedResponse = {
                    id: null,
                    err: 'error'
                };

                //resp + resp from ES
                $httpBackend.when('POST', '/api/spot/add').respond(spotCreatedResponse);
                $rootScope.$apply(function() {
                    var createSpotPromise = spotService.createSpot();
                    createSpotPromise.then(function() {
                        //error
                    }).
                    catch (function(res) {
                        assert.equal(res, 'server fail');
                    }).
                    finally(done);
                });
                $httpBackend.flush();
            });
        });


    });

});