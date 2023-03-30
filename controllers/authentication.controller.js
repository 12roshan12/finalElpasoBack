
const { SignUpModel, SignInModel, ForgotPasswordModel, ChangePasswordModel } = require('../models/authentication.model')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SignUpController = async (req, res) => {
    const result = await (SignUpModel(req))
    res.send(result)
}

const VerifyController = async (req, res) => {
    res.status(200).send("Token Verified")
}

const SignInController = async (req, res) => {
    const result = await (SignInModel(req))
    if (result.length == 1) {
        bcrypt.compare(req.body.password, result[0].password, function (err, bool) {
            if (bool == false) {
                res.status(400).send({ success: false, message: 'Passwords do not match' });
                return
            } else {
                let jwtSecretKey = process.env.jtw_secret_key;
                let data = {
                    time: Date(),
                    userId: req.body.email,
                }
                const token = jwt.sign(data, jwtSecretKey, {
                    algorithm: "HS256",
                    expiresIn: '24h'
                });
                res.status(200).send({ success: true, token: token, user: result[0].username, role: result[0].role, id: result[0]._id });
                return
            }
        })
    }
    else {
        res.status(400).send({ success: false, message: 'User does not exist.' })
    }
}

const ForgotPasswordController = async (req, res) => {
    const result = await ForgotPasswordModel(req.body)
    if (result.modifiedCount == 1) {
        res.send({ message: "Sucessfully Changed Password" })
    }
    else if (result.modifiedCount == 0) {
        res.send({ message: `User ${req.body.username} not found` })
    }
    else {
        res.status(400).send(result)
    }
}

const ChangePasswordController = async (req, res) => {
    const result = await ChangePasswordModel(req.body)
    if (result.modifiedCount == 1) {
        res.send({ message: "Sucessfully Changed Password" })
    }
    else if (result.modifiedCount == 0) {
        res.send({ message: `User ${req.body.username} not found` })
    }
    else {
        res.status(400).send(result)
    }
}


module.exports = { SignInController, SignUpController, VerifyController, ForgotPasswordController, ChangePasswordController }