'use strict';
app.controller('regController', function ($scope, $http, $location) {
    $scope.passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    $scope.nameTextpattern = /^[a-z ,.'-]+$/i;
    $scope.emailpattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    $scope.register = function (form) {
        if (form.$valid) {
            $scope.submitted = true;
            $scope.login = false;
            if ($scope.emailId !== undefined && $scope.pasw !== undefined && $scope.userName !== undefined) {
                $http({
                    method: 'POST',
                    url: 'https://user-company.herokuapp.com/registerUser',
                    data: {
                        "user_name": $scope.userName,
                        "email_id": $scope.emailId,
                        "password": $scope.pasw
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    $scope.success_res = response.data;
                    if ($scope.success_res.loginLink == 'Y') {
                        $scope.login = true;
                    } else {
                        $scope.login = false;
                    }
                }, function (response) {
                    console.log("inside failure");
                });
            }
        }
    }
    $scope.loginPage = function () {
        $location.path('/');
    }
});
