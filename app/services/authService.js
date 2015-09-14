(function() {
    
    var authService = function ($http, $window, restServices) {

        var factory = {};

        factory.getToken = function () {
            return $window.sessionStorage.getItem('token');
        };

        factory.setToken = function (token) {
            $window.sessionStorage.setItem('token', token);
        };

        factory.deleteToken = function () {
            $window.sessionStorage.removeItem('token');
        };

        factory.login = function (username, password) {

            return $http({
                url: restServices.login,
                method: "GET",
                headers: {
                    'Auth-User': username,
                    'Auth-Password': password
                }
            });
        };

        factory.logout = function (token) {
            return $http({
                url: restServices.logout,
                method: "GET",
                headers: {
                    'Auth-Token': token
                }
            });
        };

        return factory;
    };

    authService.$inject = ['$http', '$window', 'restServices'];
    angular.module('DellWorldCustomersApp').factory('authService', authService);
}())