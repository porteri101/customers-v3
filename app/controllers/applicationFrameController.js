(function() {
    
    var applicationFrameController = function ($scope, applicationInfo) {
        
        $scope.applicationInfo = applicationInfo;
                
        $scope.navItems = [{
            label: 'Home',
            icon: 'home',
            href: '#/'
        },
        {
            label: 'Customers',
            icon: 'group',
            href: '#/customers/' }];        
    };
    
    applicationFrameController.$inject = ['$scope', 'applicationInfo'];

    angular.module('DellWorldCustomersApp')
      .controller('applicationFrameController', applicationFrameController);
    
}());