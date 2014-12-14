module.exports = (function () {
    angular.module('components.tasks', [])
        .factory('taskService', taskService)
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$location', 'taskService'];
    function TaskController($location, taskService) {
        var vm = this;

        vm.tasks = [];

        vm.newTask = function (title, content) {
            taskService
                .create(title, content)
                .success(function (data) {
                    $location.path('/tasks');
                });
        };

        vm.getTasks = function () {
            taskService
                .get()
                .success(function (data) {
                    vm.tasks = data
                });
        };

        function init() {
            vm.getTasks();
        }

        init();
    }

    taskService.$inject = ['$http'];
    function taskService($http) {
        return {
            create: function (title, content) {
                return $http.post('/api/tasks', {
                    title: title,
                    content: content
                });
            },
            get: function () {
                return $http.get('/api/tasks');
            }
        }
    }
})();
