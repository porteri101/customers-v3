angular.module('DellWorldCustomersApp').value('applicationInfo', {
    name: 'Customer Database',
    version: '1.0'
});

var base = 'services/';

angular.module('DellWorldCustomersApp').value('restServices', {
    user: base + 'user/',
    login: base + 'login/',
    logout: base + 'logout/',
    getCustomers: base + 'customers/',
    getCustomer: base + 'customer?id=',
    insertCustomer: base + 'insertCustomer/',
    updateCustomer: base + 'updateCustomer/',
    deleteCustomer: base + 'deleteCustomer?id='
});

angular.module('DellWorldCustomersApp').value('customValidators', {
    thirtytwoChars: /[a-zA-Z ]{1,32}/,
    sms: /^(\+|\d)[0-9]{7,16}$/
});
