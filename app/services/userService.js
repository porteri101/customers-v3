(function() {
    
    var userService = function ($http, restServices) {

        var user = { 
            id: 0,
            isAuthenticated: false,
            userName: undefined,
            name: undefined,
            password: undefined,
            confirmPassword: undefined
        };

        user.changePassword = function (token) {
            return $http({
                url: restServices.user,
                data: user,
                method: "POST",
                headers: {
                    'Auth-Token': token
                }
            });
        };

        return user;
    };

    userService.$inject = ['$http', 'restServices'];
    angular.module('DellWorldCustomersApp').factory('userService', userService);
                                 
}())