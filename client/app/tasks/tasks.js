module.exports = (function () {
    angular.module('components.tasks', [])
        .factory('taskService', taskService)
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$location', 'taskService'];
    function TaskController($location, taskService) {
        var vm = this;

        vm.newTask = function (title, content) {
            taskService
                .create(title, content)
                .success(function (data) {
                    $location.path('/tasks');
                });
        };
    }

    taskService.$inject = ['$http'];
    function taskService($http) {
        return {
            create: function (title, content) {
                return $http.post('/api/tasks', {
                    title: title,
                    content: content
                });
            }
        }
    }
})();
