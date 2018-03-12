var loginApp = angular.module('mainApp',['ui-router']);

loginApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/dashboard', {
            templateUrl: 'dahboard.html',
            controller: 'DahboardController'
        })
        // .otherwise({
        //     redirectTo: '/login'
        // });
}]);