var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


const { User_model } = require('./user.model')

const SignUpModel = (req) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            req.body.password = hash;
            user_table = new User_model(req.body)
            user_table.save(function (err, data) {
                if (err) resolve(err);
                else {
                    resolve({ success: true, message: "User created successfully.Please proceed to login." })
                }
            });
        });
    })
}


const SignInModel = (req) => {
    return new Promise((resolve, reject) => {
        data = { email: req.body.email }
        User_model.find(data, function (err, data) {
            if (err) resolve(err)
            else {
                resolve(data)
            }
        })
    })
}

const ForgotPasswordModel = (req) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(req.password, 10, function (err, hash) {
            req.password = hash;
            User_model.updateOne({ email: req.email }, { $set: { password: req.password } }, function (err, data) {
                if (err) resolve(err)
                else resolve(data)
            })
        })
    })
}

const ChangePasswordModel = (req) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(req.password, 10, function (err, hash) {
            req.password = hash;
            User_model.updateOne({ email: req.email }, { $set: { password: req.password } }, function (err, data) {
                if (err) resolve(err)
                else resolve(data)
            })
        })
    })
}

module.exports = { SignUpModel, SignInModel, ForgotPasswordModel, ChangePasswordModel }
