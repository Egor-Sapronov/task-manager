(function () {
    require('./auth/auth.js');
    angular.module('app', [
        'ngRoute',
        'components.auth'
    ])
        .config(['$routeProvider', router]);

    function router($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/index.html'
            })
            .when('/tasks', {
                templateUrl: '/templates/tasks.html'
            })
            .when('/createtask', {
                templateUrl: '/templates/createtask.html'
            })
            .when('/account', {
                templateUrl: '/templates/auth/account.html'
            })
            .when('/login', {
                templateUrl: '/templates/auth/login.html'
            })
            .when('/register', {
                templateUrl: '/templates/auth/register.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();