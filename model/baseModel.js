require('rootpath')();
var userModel = require('./userModel');

exports.registerUser = async function (email_id, user_name, pwd) {
    return await userModel.registerUser(email_id, user_name, pwd);
};

exports.isUserPresent = async function (email_id) {
    return await userModel.isUserPresent(email_id);
};

exports.getCompanyList = async function (user_id) {
    return await userModel.getCompanyList(user_id);
};

exports.getUserLoggedinDetails = async function (email_id, pwd) {
    return await userModel.getUserLoggedinDetails(email_id, pwd);
};

exports.resetPassword = async function (email_id, new_pwd) {
    return await userModel.resetPassword(email_id, new_pwd);
};

exports.updateFavCompany = async function (company_id, status, user_id) {
    return await userModel.updateFavCompany(company_id, status, user_id);
};

exports.getMyFavCompany = async function (user_id) {
    return await userModel.getMyFavCompany(user_id);
};
