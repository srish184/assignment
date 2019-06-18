'use strict';

var app = angular
  .module('app', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'components/login/login.html',
      controller: 'loginController'
    })
    .when('/register', {
      templateUrl: 'components/register/register.html',
      controller: 'regController'
    })
    .when('/company', {
      templateUrl: 'components/company/company.html',
      controller: 'companyController as cmpny'
    })
    .when('/resetPwd', {
      templateUrl: 'components/resetPwd/resetPwd.html',
      controller: 'resetPasswordController'
    })

});

