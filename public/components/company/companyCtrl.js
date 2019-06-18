'use strict';
app.controller('companyController', function ($scope, $http, $location, $window) {
    var vm = this;
    var user_details = localStorage.getItem("user_details");
    $scope.fav = true;
    vm.getCompanyDetails = function () {
        var user_id = JSON.parse(user_details)[0]._id;
        $scope.companyList = [];
        $http({
            method: 'POST',
            url: 'http://localhost:8080/getCompanyList',
            data: {
                "user_id": user_id
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {

            $scope.fav = true;
            $scope.companyList = response.data;
        }, function (response) {
            console.log("inside failure");
        });
    }
    if (user_details != null) {
        vm.getCompanyDetails();
    }
    vm.logout = function () {
        localStorage.clear();
        sessionStorage.clear();
        $location.path('/');
    }

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.favourite = function (company_id, status) {
        var user_id = JSON.parse(user_details)[0]._id;
        $http({
            method: 'POST',
            url: 'http://localhost:8080/favouriteCompany',
            data: {
                "company_id": company_id,
                "status": status,
                "user_id": user_id
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            $scope.success_res = response.data;
            if ($scope.success_res.update == "Y") {
                $scope.companyList.forEach(function (company) {
                    if (company._id == company_id) {
                        company.status = status;
                    }
                });
                $scope.updateSuccuss = true;
            } else {
                $scope.updateSuccuss = false;
            }
        }, function (response) {
            console.log("inside failure");
        });


    }

    $scope.getFavCompany = function () {
        var user_id = JSON.parse(user_details)[0]._id;
        $scope.companyList = [];
        $http({
            method: 'POST',
            url: 'http://localhost:8080/getFavCompanyList',
            data: {
                user_id: user_id
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            $scope.companyDetail = response.data;
            $scope.companyDetail.forEach(function (company, key) {
                $scope.companyListDetails = company.company_list;
                $scope.companyListDetails.forEach(function (companyFile) {
                    $scope.companyList.push(companyFile);
                });
            });
            $scope.fav = false;
        }, function (response) {
            console.log("inside failure");
        });
    }
})