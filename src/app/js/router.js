/**
 * Created by dailu on 3/12/2017.
 */

var app = angular.module('myApp', ['ngRoute']);

app.controller('pageController', function($scope, NextBackBasicService, $location) {
    //$scope.message = $location.path();
});

app.config(function($routeProvider) {
    $routeProvider.
    when('/route1', {
        templateUrl: 'page1.html',
        //controller: 'MainCtrl'
    }).
    when('/route2', {
        templateUrl: 'page2.html',
        //controller: 'MainCtrl'
    }).
    when('/route3', {
        templateUrl: 'page3.html',
        //controller: 'MainCtrl'
    }).
    when('/route4', {
        templateUrl: 'page4.html',
        //controller: 'MainCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/route1'
    });
});

app.run(function($rootScope, NextBackBasicService){
    $rootScope.next = function() {
        NextBackBasicService.next();
    };

    $rootScope.previous = function() {
        NextBackBasicService.previous();
    };
});

app.factory('NextBackBasicService', function($route, $location) {
    //array for keeping defined routes
    var routes = [];

    angular.forEach($route.routes, function(config, route) {
        //not to add same route twice
        if (angular.isUndefined(config.redirectTo)) {
            routes.push(route);
        }
    });

    return {
        next: function() {
            var nextIndex = routes.indexOf($location.path()) + 1;
            if (nextIndex === routes.length) {
                $location.path(routes[0]);
            } else {
                $location.path(routes[nextIndex]);
            }
        },
        previous: function() {
            var backIndex = routes.indexOf($location.path()) - 1;
            if (backIndex === -1) {
                $location.path(routes[routes.length - 1]);
            } else {
                $location.path(routes[backIndex]);
            }
        }
    };

});
