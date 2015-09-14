(function() {
    
    var applicationController = function ($scope, userService, authService, $location) {
              
        $scope.$on('$locationChangeStart', function(event, next, current) {
            if (! userService.isAuthenticated) {
                if ($location.path() !== '/login') {
                   reset ();
                }
            } else {
                if ($location.path() === '/login') {
                    reset();
                    //$location.path('/');
                }
            }
        });
        
        $scope.logout = function() {
           authService.logout(authService.getToken).success(function(data){
                    reset();
                }).error(function(status, data) {
                    reset();
                    console.log(status);
                    console.log(data); 
                    $location.path('/login');
                });
        };
        
        function reset () {
            userService.id = 0;
            userService.isAuthenticated = false;
            userService.userName = undefined;
            userService.name = undefined;
            userService.password = undefined;
            userService.confirmPassword = undefined;
            authService.deleteToken();
        };
        
    };
    
    applicationController.$inject = ['$scope', 'userService', 'authService', '$location'];

    angular.module('DellWorldCustomersApp')
      .controller('applicationController', applicationController);
    
}());