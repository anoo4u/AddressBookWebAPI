// Defining angularjs module
var app = angular.module('angModuleAddressBook', []);

// Defining angularjs Controller and injecting Contact Service
app.controller('angCtrlAddressBook', function ($scope, $http, ContactsService) {

    $scope.contactsData = null;
    // Fetching records from the factory created at the bottom of the script file
    ContactsService.GetAllRecords().then(function (d) {
        $scope.contactsData = d.data; // Success
    }, function () {
        showMessages('Error Occured during getting all records !!!'); // Failed
    });

    

    $scope.Contact = {
        ContactID: '',
        Name: '',
        Email: '',
        PhoneNumber: '',
        JobPosition: '',
        Institution: '',
        AddressLine: ''
        
    };

    // Reset Contact details
    $scope.clear = function () {
       

        $scope.Contact.ContactID= '',
        $scope.Contact.Name= '',
        $scope.Contact.Email= '',
        $scope.Contact.PhoneNumber= '',
        $scope.Contact.JobPosition= '',
        $scope.Contact.Institution= '',
        $scope.Contact.AddressLine= ''
        // clear display messages 
        hideMessages();
        $scope.contactForm.$setUntouched();
        
    }

    //Add New Item
    $scope.save = function () {
        if (typeof ($scope.Contact.Name) != 'undefined' && $scope.Contact.Name != "" && ($scope.Contact.Email) != 'undefined' && $scope.Contact.Email != "") {
            if (validateEmail($scope.Contact.Email)) {
                // or you can call Http request using $http
                $http({
                    method: 'POST',
                    url: '../api/Contacts/PostContact/',
                    data: $scope.Contact
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.contactsData.push(response.data);
                    $scope.clear();
                    showMessages("Contact Added Successfully !!!");
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    showMessages("Error : " + response.data.ExceptionMessage);
                });
            }
            else {
                showMessages('Please enter valid email address !!');
            }
        }
        else {
            showMessages('Please enter mandatory values for Name and Email !!');
        }
    };

    // Edit Contact details
    $scope.edit = function (data) {
        $scope.clear();
        $scope.Contact = {
            ContactID: data.ContactID,
            Name: data.Name,
            Email: data.Email,
            PhoneNumber: data.PhoneNumber,
            JobPosition:data.JobPosition,
            Institution: data.Institution,
            AddressLine:data.AddressLine
        };
    }


    // find on map 
    $scope.findAddressOnMap = function (data) {
         query = data.AddressLine;
         map.getCredentials(callSearchService);
    }

    // Cancel Contact details
    $scope.cancel = function () {
        $scope.clear();
    }

    // Update Contact details
    $scope.update = function () {
        if (typeof ($scope.Contact.Name) != 'undefined' && $scope.Contact.Name != "" && ($scope.Contact.Email) != 'undefined' && $scope.Contact.Email != "") {
            if(validateEmail($scope.Contact.Email)){
                $http({
                    method: 'PUT',
                    url: '../api/Contacts/PutContact/' + $scope.Contact.ContactID,
                    data: $scope.Contact
                }).then(function successCallback(response) {
                    $scope.contactsData = response.data;
                    $scope.clear();
                    showMessages("Contact updated successfully !!!");
                }, function errorCallback(response) {
                    showMessages("Error : " + response.data.ExceptionMessage);
                });
            }
            else{
                showMessages('Please enter valid email address !!');
            }
        }
        else {
            showMessages('Please enter mandatory values for Name and Email !!');
        }
    };

    // Delete Contact details
    $scope.delete = function (index) {

        var retVal = confirm("Do you want to delete " + $scope.contactsData[index].Name  + "'s contact from address book ?");
        if (retVal) {
            $http({
                method: 'DELETE',
                url: '../api/Contacts/DeleteContact/' + $scope.contactsData[index].ContactID,
            }).then(function successCallback(response) {
                $scope.contactsData.splice(index, 1);
                showMessages("Contact deleted successfully !!!");
            }, function errorCallback(response) {
                showMessages("Error : " + response.data.ExceptionMessage);
            });

        }
    };

});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('ContactsService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('../api/Contacts/GetAllContacts');
    }
    return fac;
});

