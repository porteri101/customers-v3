(function() {
    
    var myProfileController = function ($scope, $location, cuiLoading, cuiAlertService, userService, customValidators) {
       
        $scope.alert = function (type, location, message, expire) {
            cuiAlertService({
                content: message,
                location: location,
                type: type,
                destroyAfter: expire
            });
        };

        $scope.thirtytwoChars = customValidators.thirtytwoChars;
        
        $scope.passwordEdit = false;
        
        $scope.userService = userService;

        $scope.showPassword = function(value) {
         $scope.passwordEdit = value;   
        }
        
        $scope.showMyProfile = function () {
            $location.path('/myProfile/');
        }
   
        $scope.changePassword = function () {

            cuiLoading(userService.changePassword().then(function success(response) {
                $scope.alert('success', 'profile-alerts', 'Successfully changed your password', 5000);
                $scope.userService.password = undefined;
                $scope.userService.confirmPassword = undefined;
                $scope.passwordEdit = false;
            }, function failure(err) {
                $scope.alert('danger', 'profile-alerts', 'Could not change the password. ' + err.status + ' ' + err.statusText);
                $scope.userService.password = undefined;
                $scope.userService.confirmPassword = undefined;
            }));
            
        }
    };
    
    myProfileController.$inject = ['$scope', '$location', 'cuiLoading', 'cuiAlertService', 'userService', 'customValidators'];

    angular.module('DellWorldCustomersApp')
      .controller('myProfileController', myProfileController);
    
}());