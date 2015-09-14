(function() {
    
    var startScreenController = function ($scope, $location, applicationInfo, authService, userService, cuiDialog) {
          
        $scope.startScreenSettings = {
            applicationName: applicationInfo.name,
            usernameParser: undefined
        };
        
        $scope.onSignIn = function(userData) {
            userService.isAuthenticated = false;
            userService.userName = undefined;  
            authService.deleteToken();
            
            if (userData.username != null && userData.password != null) {
                authService.login(userData.username, userData.password).success(function(data, status, headers, config){

                    userService.id = data.uid;
                    userService.isAuthenticated = true;
                    userService.userName = data.email;
                    userService.name = data.name;
                    
                    authService.setToken(headers('Auth-Token'));
                    $location.path('/');
                }).error(function(data, status, headers, config) {
                    var errorDialog = cuiDialog({
                        title: 'There are errors...',
                        message: 'An error has occurred, code: ' + status,
                        icon: 'exclamation-sign',
                        iconColor: 'red',
                        buttons: 'ok'
                    });
                    errorDialog();
                    
                    console.log(status);
                    console.log(data); 
                });
            }
         };
    };
    
    startScreenController.$inject = ['$scope', '$location', 'applicationInfo', 'authService', 'userService','cuiDialog'];

    angular.module('DellWorldCustomersApp')
      .controller('startScreenController', startScreenController);
    
}());