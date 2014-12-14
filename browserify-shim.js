module.exports = function (paths) {
    return {
        angular: {
            path: paths.vendor + 'angular/angular.js',
            exports: 'angular'
        },
        angularRoute: {
            path: paths.vendor + 'angular-route/angular-route.js',
            exports: 'ngRouteModule',
            depends: {
                angular: 'angular'
            }
        },
        angularMocks: {
            path: paths.vendor + 'angular-mocks/angular-mocks.js',
            exports: 'ngMocks',
            depends: {
                angular: 'angular'
            }
        }
    };
};