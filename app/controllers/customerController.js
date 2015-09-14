(function() {
    
    var customerController = function ($scope,  cuiAlertService, cuiDialog, cuiModal, customerService, cuiLoading) {
       
        $scope.rowCollection = [];

        getCustomers();

        $scope.alert = function(type, location, message, expire) {
            cuiAlertService({
                content: message,
                location: location,
                type: type,
                destroyAfter: expire
            });
        }; 
      
        var dialogDelete = cuiDialog({
            title: 'Warning!',
            message: 'Are you sure you want to delete the selected customer?',
            icon: 'question-sign',
            iconColor: 'yellow',
            buttons: 'okcancel'
        });
        
        var modalDialog =  cuiModal({
            templateUrl: 'app/views/dialogCustomer.html',
            scope: $scope, 
            controller: 'dialogCustomerController',
            static: 'true'
        });
         
        $scope.doActionEditCustomer = function(id) {
            $scope.$emit('on_showCustomerDialog', id);  
        }
        
        $scope.doActionDeleteCustomer = function(id, name) {
            $scope.$emit('on_deleteCustomer', id, name);   
        }
        
         $scope.addCustomer = function(){
            $scope.addNew = true;
            $scope.dialogHeading ="Add New Customer";
            $scope.customer = {};
            modalDialog.modal.show();           
        };
        
        $scope.$on('on_showCustomerDialog',function(event, id){
            getCustomer(id); 
        });
        
        $scope.$on('on_addCustomer',function(event, customer){
            cuiLoading(customerService.addCustomer(customer).then(function success(response) {
                $scope.alert('success', 'customer-alerts', 'Added customer ' + customer.customerName, 5000);
                //refresh table
                $scope.getCustomers();
            }, function failure(err) {
                $scope.alert('danger', 'customer-alerts', 'Customer could not be added. ' + err.status + ' ' + err.statusText);
            }));
            $scope.customer = {};
        });
        
        $scope.$on('on_editCustomer',function(event, customer){
            cuiLoading(customerService.updateCustomer(customer).then(function success(response) {
                $scope.alert('success', 'customer-alerts', 'Updated customer ' + customer.customerName, 5000);
                //refresh table
                $scope.getCustomers();
            }, function failure(err) {
                if (err.status != 304) {
                    $scope.alert('danger', 'customer-alerts', 'Customer could not be updated. ' + err.status + ' ' + err.statusText);
                }
                else {
                    console.log("Customer update: 304, no changes made");
                }
            }));
            $scope.customer = {};
        });
        
        $scope.$on('on_deleteCustomer',function(event, id, name){
            dialogDelete().then(function() {
                cuiLoading(customerService.deleteCustomer(id).then(function success(response) {
                    $scope.alert('success', 'customer-alerts', 'Deleted customer: ' + name, 3000);
                    //refresh table
                    $scope.getCustomers();
                }, function failure(err) {
                    $scope.alert('danger', 'customer-alerts', 'Customer could not be deleted. ' + err.status + ' ' + err.statusText);
                }));
            }, function() {
            });
            $scope.customer = {};
        });
     
        $scope.getCustomers =function() {
            getCustomers();    
        }
        
        function getCustomers () {
            cuiLoading(customerService.getCustomers().then(function success(response) {
                $scope.rowCollection = response.data;
            }, function failure(err) {
                $scope.alert('danger', 'customer-alerts', 'Customer data could not be retieved: ' + err.statusText);
                console.log (status);
            }));
        }; 
        
        function getCustomer(id) {
            $scope.customer = {};
            cuiLoading(customerService.getCustomer(id).then(function success(response) {
                //to do test for empty result
                $scope.customer = response.data;
                $scope.dialogHeading ="Edit Customer";
                $scope.addNew = false;
                modalDialog.modal.show(); 
            }, function failure(err) {
                $scope.alert('danger', 'customer-alerts', 'Could not retrieve Cutomer Id ' + id + ': ' + err.statusText);
                console.log (status);
            }));
        };
    };
    
    var dialogCustomerController = function ($scope, cuiModal, cuiLoading, customValidators) {
            
            $scope.thirtytwoChars = customValidators.thirtytwoChars;

            $scope.cancel = function (theForm) {
                theForm.$setPristine();
                $scope.modal.hide();
            };

            $scope.ok = function(theForm) {
 
                if (theForm.$valid) {
                    theForm.$setPristine();
                    $scope.modal.hide();
                    if ($scope.addNew) {
                        $scope.$emit('on_addCustomer', $scope.customer);
                    } else {
                        $scope.$emit('on_editCustomer', $scope.customer);
                    } 
                }
            };
    };
    
    customerController.$inject = ['$scope', 'cuiAlertService', 'cuiDialog', 'cuiModal', 'customerService', 'cuiLoading'];
    dialogCustomerController.$inject =['$scope', 'cuiModal', 'cuiLoading', 'customValidators'];

    angular.module('DellWorldCustomersApp')
      .controller('customerController', customerController);
    
    angular.module('DellWorldCustomersApp')
      .controller('dialogCustomerController', dialogCustomerController);
    
}());