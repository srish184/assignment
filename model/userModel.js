require('rootpath')();
var Company = global.Company;
var User = global.User;
var Favcompany = global.Favcompany;
var ObjectId = require('mongodb').ObjectID;

/*
*method to register user
*/
exports.registerUser = async function (email_id, user_name, pwd) {
	try {
		var user_details = {
			user_name: user_name,
			email: email_id,
			password: pwd
		}
		const insertedCount = await User.insertOne(user_details);
		return insertedCount.insertedCount;
	} catch (err) {
		console.log("error in registration---" + err);
		throw err;
	}

}

/*
*method to check whether provider email id is already registered
*/
exports.isUserPresent = async function (email_id) {
	try {
		var email = email_id;
		var viewData = {

		}
		const queryStmt = await User.find({ email }).count();
		if (queryStmt > 0) {
			viewData["userExist"] = "true";
		} else {
			viewData["userExist"] = "false";
		}
		return viewData;
	} catch (err) {
		console.log("error in getting user from DB---" + err);
		throw err;
	}
}

/*
*method to fetch all company list with favourite status of logged in users
*/
exports.getCompanyList = async function (user_id) {
	try {
		var favCompanyList = [];
		const viewData = await Company.aggregate([{
			$lookup:
			{
				from: "fav_company",
				localField: "_id",
				foreignField: "company_id",
				as: "favList"
			}
		}]).toArray();
		for (var i = 0; i < viewData.length; i++) {
			if (viewData[i].favList.length > 0) {
				for (var j = 0; j < viewData[i].favList.length; j++) {
					if (viewData[i].favList[j].user_id == user_id) {
						viewData[i]["status"] = viewData[i].favList[j].fav;
						break;
					} else {
						viewData[i]["status"] = false;
					}
				}
			} else {
				viewData[i]["status"] = false;
			}
		}
		console.log(viewData);
		return (viewData);
	} catch (err) {
		console.log("error in getting company list from DB", err);
		throw err;
	}
}

/*
*method to fetch fetch login details and login to application
*/
exports.getUserLoggedinDetails = async function (email_id, pwd) {
	try {
		var password = pwd;
		const viewData = await User.find({ email: email_id, password: password }).toArray();
		return viewData;
	} catch (err) {
		console.log("error in getting company list from DB", err);
		throw new Error(err);
	}
}

/*
*method to reset user's password
*/
exports.resetPassword = async function (email_id, new_pwd) {
	try {
		var password = new_pwd;
		const viewData = await User.updateOne({ email: email_id }, { $set: { password: password } });
		return viewData.result;
	} catch (err) {
		console.log("error in getting updating password ", err);
		throw new Error(err);
	}
}

/*
*method to update favourite/non-favourite company for logged in user
*/
exports.updateFavCompany = async function (company_id, status, user_id) {
	try {
		var viewData = null;
		var success = 0;
		const getfavcompanyDetail = await Favcompany.find({ user_id: ObjectId(user_id), company_id: ObjectId(company_id) }).toArray();
		if (getfavcompanyDetail.length > 0) {
			viewData = await Favcompany.update({ user_id: ObjectId(user_id), company_id: ObjectId(company_id) }, { $set: { fav: status } });
			success = viewData.result.nModified;
		} else {
			viewData = await Favcompany.insertOne({ user_id: ObjectId(user_id), company_id: ObjectId(company_id), fav: status });
			success = viewData.insertedCount;
		}

		return success;
	} catch (err) {
		console.log("error in getting updating password ", err);
		throw new Error(err);
	}
}

/*
*method to list favourite company of logged in user
*/
exports.getMyFavCompany = async function (users_id) {
	try {
		var favCompanyList = [];
		const viewData = await Favcompany.aggregate([{
			$lookup:
			{
				from: "company",
				localField: "company_id",
				foreignField: "_id",
				as: "company_list"
			}
		}]).toArray();
		for (var i = 0; i < viewData.length; i++) {
			if (viewData[i].fav == true && viewData[i].user_id == users_id) {
				viewData[i].company_list[0]["status"] = viewData[i].fav;
				favCompanyList.push(viewData[i]);
			}
		}
		return favCompanyList;
	} catch (err) {
		console.log("error in getting favourite company ", err);
		throw new Error(err);
	}
}