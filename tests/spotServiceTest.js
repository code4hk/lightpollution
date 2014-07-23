var assert = require('chai').assert;
var expect = require('chai').expect;

// //work around for requirejs
// var _testBootstrap = require('./_testBootstrap');
// //can only override from here
// require=requirejs;

//another pbm: module here didnt get export
require(
    ["angular"], function(angular, spotService) {

        // , "services/spotService"
        console.log('run')

        // var angular = require('angular');
        // http://docs.angularjs.org/api/ngMock.$httpBackend

        describe('spotService', function() {
            console.log('test');
            // console.log(angular);
            // beforeEach(module('lightpollution'));
            // beforeEach(inject(function(MyService, _$httpBackend_) {
            //     console.log('set up test case')
            //     // service = MyService;
            //     // $httpBackend = _$httpBackend_;
            // }));

            // describe('create spots', function() {
            //     it('should send request to node server', function() {
            //         console.log('test');
            //         // assert server response is positive
            // $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'}, {'A-Token': 'xxx'}

            //     });
            // });
        });
    });