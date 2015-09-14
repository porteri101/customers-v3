(function() {
    
    var httpResponseInterceptor = function($q, $location) {
        
        var factory = {};
            
        factory.response = function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        };    

        factory.responseError = function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                $location.path('/login');
            }
            return $q.reject(rejection);
        }; 

        return factory;  
    };
    
    httpResponseInterceptor.$inject = ['$q', '$location'];
        
    angular.module('DellWorldCustomersApp').factory('httpResponseInterceptor', httpResponseInterceptor);                             
}())