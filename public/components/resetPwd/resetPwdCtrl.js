'use strict';
app.controller('resetPasswordController', function ($scope, $location, $http) {
    $scope.passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    $scope.emailpattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    $scope.resetPwd = function (form) {
        if (form.$valid) {
            $scope.submitted = true;
            if ($scope.emailId !== undefined && $scope.oldpassword !== undefined && $scope.newpassword !== undefined) {
                $http({
                    method: 'POST',
                    url: 'https://user-company.herokuapp.com/resetPassword',
                    data: {
                        "email_id": $scope.emailId,
                        "old_password": $scope.oldpassword,
                        "new_password": $scope.newpassword
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
    };

    $scope.loginPage = function () {
        $location.path('/');
    }
});