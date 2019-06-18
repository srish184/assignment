'use strict';
app.controller('loginController', function ($scope, $location, $http) {
	$scope.passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
	$scope.emailpattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
	$scope.signUp = function () {
		$location.path('/register');
	}
	$scope.forgotPassword = function () {
		$location.path('/resetPwd');
	}

	$scope.login = function (loginForm) {
		if (loginForm.$valid) {
			$scope.submitted = true;
			if ($scope.emailId !== undefined && $scope.pasw !== undefined) {
				$http({
					method: 'POST',
					url: 'http://localhost:8080/loginUser',
					data: {
						"email_id": $scope.emailId,
						"password": $scope.pasw
					},
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function (response) {
					$scope.respData = response.data;
					$scope.dataCount = response.data.length;

					if ($scope.dataCount > 0) {
						localStorage.setItem("user_details", JSON.stringify($scope.respData));
						$location.path('/company');
					} else {
						$scope.errorMsg = "Please provide correct email id and password combination for log in to the application";
					}
				}, function (response) {
					console.log("inside failure");
				});
			}
		}
	}
});