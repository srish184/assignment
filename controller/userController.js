require('rootpath')();
var baseModel = require('../model/baseModel');

/*
*method to register user
*/
exports.registerUser = async function (req, res) {
	var email_id = req.body.email_id;
	var user_name = req.body.user_name;
	var pwd = req.body.password;
	var msg = {};
	try {

		const emailExist = await baseModel.isUserPresent(email_id);
		if (emailExist["userExist"] == "false") {
			const regSuccess = await baseModel.registerUser(email_id, user_name, pwd);
			console.log(regSuccess);
			if (regSuccess > 0) {
				msg["displayMsg"] = "User registration is successful, please login using login button.";
				msg["loginLink"] = "Y";
			} else {
				msg["displayMsg"] = "User registration is not successful";
				msg["loginLink"] = "N";
			}
		} else {
			msg["displayMsg"] = "User with provided email id already exist, please try again with different email id.";
			msg["loginLink"] = "N";
		}
		res.send(msg);
	} catch (err) {
		console.log(err);
		throw err;
	}

};

/*
*method to fetch all company list with favourite status of logged in users
*/
exports.getCompanyList = async function (req, res) {
	try {
		var user_id = req.body.user_id;
		const viewData = await baseModel.getCompanyList(user_id);
		res.send(viewData);

	} catch (err) {
		throw new Error(err);
	}
};

/*
*method to fetch fetch login details and login to application
*/
exports.getUserLoggedinDetails = async function (req, res) {
	try {
		var user_details = [];
		var email_id = req.body.email_id;
		var pwd = req.body.password;
		var userObj = {};
		const viewData = await baseModel.getUserLoggedinDetails(email_id, pwd);
		if (viewData.length > 0) {
			userObj["name"] = viewData[0].user_name;
			userObj["email"] = viewData[0].email;
			userObj["_id"] = viewData[0]._id;
			userObj["company"] = viewData[0].company == null ? "" : viewData[0].company;
			user_details.push(userObj);
		}
		res.send(user_details);

	} catch (err) {
		throw new Error(err);
	}
};

/*
*method to reset user's password
*/
exports.resetPassword = async function (req, res) {
	try {
		var email_id = req.body.email_id;
		var old_passowrd = req.body.old_password;
		var new_password = req.body.new_password;
		var msg = {};
		const emailandpassMatch = await baseModel.getUserLoggedinDetails(email_id, old_passowrd);
		console.log(emailandpassMatch.length);
		if (emailandpassMatch.length > 0) {
			const viewData = await baseModel.resetPassword(email_id, new_password);
			if (viewData.nModified > 0) {
				msg["displayMsg"] = "Password has been updated successfully, please login using login button.";
				msg["loginLink"] = "Y";
			} else {
				msg["displayMsg"] = "Please enter a new password different from previous one.";
				msg["loginLink"] = "N";
			}
		} else {
			msg["displayMsg"] = "You have entered wrong Email id or old password, please try again.";
			msg["loginLink"] = "N";
		}
		res.send(msg);

	} catch (err) {
		throw new Error(err);
	}
};

/*
*method to update favourite/non-favourite company for logged in user
*/
exports.favouriteCompany = async function (req, res) {
	try {
		var company_id = req.body.company_id;
		var status = req.body.status;
		var user_id = req.body.user_id;
		var msg = {};
		const viewData = await baseModel.updateFavCompany(company_id, status, user_id);
		if (viewData > 0) {
			msg["displayMsg"] = "Favourite company is updated successfully";
			msg["update"] = "Y";
		} else {
			msg["displayMsg"] = "Unable to update the favourite company";
			msg["update"] = "N";
		}
		res.send(msg);
	} catch (error) {
		throw new Error(error);
	}
}

/*
*method to list favourite company of logged in user
*/
exports.getMyFavCompany = async function (req, res) {
	try {
		var user_id = req.body.user_id;
		const viewData = await baseModel.getMyFavCompany(user_id);
		res.send(viewData);
	} catch (error) {
		throw new Error(error);
	}
}