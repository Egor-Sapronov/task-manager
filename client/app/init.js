(function () {
    require('./auth/auth.js');
    angular.module('app', [
        'ngRoute',
        'components.auth'
    ])
        .config(['$routeProvider', router])
        .factory('TokenInterceptor', function ($window) {
            return {
                request: function (config) {
                    if ($window.sessionStorage.Bearer) {
                        config.headers['Authorization'] = 'Bearer ' + $window.sessionStorage.Bearer;
                    }
                    return config;
                }
            };
        })
        .factory('AccessInterceptor', function ($q, $location) {
            return {
                'responseError': function (rejection) {
                    console.log(rejection.status);

                    if (rejection.status === 401)
                        $location.path('/login');

                    return $q.reject(rejection);
                }
            };
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('TokenInterceptor');
            $httpProvider.interceptors.push('AccessInterceptor');
        });

    function router($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/index.html'
            })
            .when('/tasks', {
                templateUrl: '/templates/tasks.html'
            })
            .when('/createtask', {
                templateUrl: '/templates/tasks/create.html'
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