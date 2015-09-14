(function() {
    
    var aboutBoxController = function ($scope, cuiAboutBox, applicationInfo) {
              
        var about = cuiAboutBox({
            applicationName: applicationInfo.name,
                version: applicationInfo.version
        });
        $scope.showAboutBox = about.modal.show;
    };
    
    aboutBoxController.$inject = ['$scope', 'cuiAboutBox', 'applicationInfo'];

    angular.module('DellWorldCustomersApp')
      .controller('aboutBoxController', aboutBoxController);
    
}());