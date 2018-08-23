/**
 * user controller : Methods for users
 */

const otpModel = require("./model");
const twilio = require('twilio');

const statusCode = require("../../../utils/statusCode");
const statusMsg = require("../../../utils/statusCode");
const env = require("../../../utils/env");
const logger = require('../../../utils/logger');


var otpController = {};


const client = new twilio(env.accountSid, env.authToken);

otpController.generate = async (req, res) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    if (req.body.mobile) {
        try {
            let sms = await client.messages.create({
                body: code + ' This is your One Time Password for Challenge App',
                to: '+919997816828',
                from: '+12017332527'
            });
            let _obj = {
                mobile: req.body.mobile,
                otp: code
            }
            let opt = await otpModel.findOneAndUpdate({ mobile: req.body.mobile }, { $set: _obj }, { new: true, upsert: true });
            res.status(statusCode.ok).send({ opt: code });
        } catch (err) {
            console.log('err in twilio = ', err);
            res.status(statusCode.internal).send(err);
        }
    } else {
        res.status(statusCode.bad).send(statusMsg.bad)
    }

}

otpController.verify = async (req, res) => {
    if (req.body.mobile && req.body.otp) {
        let condition = {
            mobile: req.body.mobile,
            otp: req.body.otp
        }
        let matchOtp = await otpModel.findOne(condition);
        if (matchOtp) {
            res.status(statusCode.ok).send(statusMsg.ok);
        } else {
            res.status(statusCode.notFound).send(statusMsg.notFound);
        }

    } else {
        res.status(statusCode.bad).send(statusMsg.bad);
    }
}

otpController.sendMessage = async (data) => {
    if (data.mobile) {
        try {
            let sms = await client.messages.create({
                body: data.messages,
                to: '+919997816828',
                from: '+12017332527'
            });
            return new Promise((resolve)=>resolve(true))
        } catch (err) {
            return new Promise((resolve, reject)=>reject(err))
        }
    } else {
        return new Promise((resolve, reject)=>reject('No mobile Number'))
    }
}
module.exports = otpController;
