require('rootpath')();

var userController = require('./userController');

module.exports = function (app) {
	app.post('/registerUser', userController.registerUser);
	app.post('/getCompanyList', userController.getCompanyList);
	app.post('/loginUser', userController.getUserLoggedinDetails);
	app.post('/resetPassword', userController.resetPassword);
	app.post('/favouriteCompany', userController.favouriteCompany);
	app.post('/getFavCompanyList', userController.getMyFavCompany);
}