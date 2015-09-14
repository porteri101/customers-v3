(function() {
    
    var app = angular.module('DellWorldCustomersApp', ['cui', 'ngRoute', 'customFilters']);

    app.config(function($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'homeController',
            templateUrl: 'app/views/home.html'
        })
        .when('/customers/', {
            controller: 'customerController',
            templateUrl: 'app/views/customers.html',
        })
        .when('/customers/:customerId', {
            controller: 'customerController',
            templateUrl: 'app/views/customers.html',
        })
        .when('/login' , {
              templateUrl: 'index.html'
              })
        .when('/myProfile', {
            controller: 'myProfileController',
            templateUrl: 'app/views/myProfile.html'
        })            
        .otherwise( { redirectTo: '/' } );
    });
    
    app.config(function($httpProvider) {
      $httpProvider.interceptors.push('httpResponseInterceptor');
    });  

    app.run(function($rootScope, $templateCache, $location, userService) {
        $rootScope.userService  = userService;
       
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (typeof(current) !== 'undefined'){
                $templateCache.remove(current.templateUrl);
            }
        
        });
        
    });
    

    app.directive('nxEqualEx', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, model) {
                if (!attrs.nxEqualEx) {
                    console.error('nxEqualEx expects a model as an argument!');
                    return;
                }
                scope.$watch(attrs.nxEqualEx, function (value) {
                    // Only compare values if the second ctrl has a value.
                    if (model.$viewValue !== undefined && model.$viewValue !== '') {
                        model.$setValidity('nxEqualEx', value === model.$viewValue);
                    }
                });
                model.$parsers.push(function (value) {
                    // Mute the nxEqual error if the second ctrl is empty.
                    if (value === undefined || value === '') {
                        model.$setValidity('nxEqualEx', true);
                        return value;
                    }
                    var isValid = value === scope.$eval(attrs.nxEqualEx);
                    model.$setValidity('nxEqualEx', isValid);
                    return isValid ? value : undefined;
                });
            }
        };
    });
    
}());