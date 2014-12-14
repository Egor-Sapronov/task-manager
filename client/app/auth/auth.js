module.exports = (function () {
    angular.module('components.auth', [])
        .factory('userService', userService)
        .factory('authenticationService', authenticationService)
        .controller('AccountController', AccountController)
        .controller('LoginController', LoginController);

    AccountController.$inject = ['userService'];
    function AccountController(userService) {
        var vm = this;

        vm.username = '';

        userService.userInfo().success(function (data) {
            vm.username = data.name;
        });
    }

    LoginController.$inject = ['$window', '$location', 'userService', 'authenticationService'];
    function LoginController($window, $location, userService, authenticationService) {
        var vm = this;
        vm.login = function (username, password) {
            userService.logIn(username, password)
                .success(function (data) {
                    authenticationService.isLogged = true;
                    authenticationService.username = username;
                    $window.sessionStorage.Bearer = data.access_token;
                    $window.sessionStorage.User = username;
                    $location.path('/');
                })
                .error(function (status, data) {

                });
        };
    }

    userService.$inject = ['$http', '$window'];
    function userService($http, $window) {
        return {
            logIn: function (username, password) {
                return $http.post('/oauth/token', {
                    grant_type: 'password',
                    client_id: 'web',
                    client_secret: 'qwerty',
                    username: username,
                    password: password
                });
            },
            register: function (registerData) {
                return $http.post('/oauth/register', registerData);
            },
            // TODO: delete username too
            logOff: function () {
                if ($window.sessionStorage.Bearer) {
                    $window.sessionStorage.Bearer = null;
                }
            },
            username: function () {
                if ($window.sessionStorage.User) {
                    return $window.sessionStorage.User;
                }
            },
            userInfo: function () {
                return $http.get('/api/userInfo')
            }
        };
    }

    // TODO: provide username from session storage on app init
    function authenticationService() {
        var auth = {
            isLogged: false,
            username: ''
        };

        return auth;
    }
})();