(function() {
    var customerService = function($http, authService, restServices) {
    
        var factory = {};
        
        factory.getCustomers = function() {
            return $http({
                url: restServices.getCustomers,
                method: "GET",
                headers: {
                    'Auth-Token': authService.getToken
                }
            });
        };
        
        factory.getCustomer = function(id) {
            return $http({
                url: restServices.getCustomer + id,
                data: id,
                method: "GET",
                headers: {
                    'Auth-Token': authService.getToken
                }
            });
        };
        
        factory.addCustomer = function(customer) {
            return $http({
                url: restServices.insertCustomer,
                method: "POST",
                data: customer,
                headers: {
                    'Auth-Token': authService.getToken
                }
            });  
        };
        
        factory.updateCustomer = function(customer) {
          return $http({
                url: restServices.updateCustomer,
                method: "POST",
                data: customer,
                headers: {
                    'Auth-Token': authService.getToken
                }
            });  
        };
                
        factory.deleteCustomer = function(id) {
          return $http({
                url: restServices.deleteCustomer + id,
                data: id,
                method: "DELETE",
                headers: {
                    'Auth-Token': authService.getToken
                }
            });
        };
        
        return factory;
    };
    
    customerService.$inject = ['$http', 'authService', 'restServices'];
        
    angular.module('DellWorldCustomersApp').factory('customerService', customerService);
                                           
}());