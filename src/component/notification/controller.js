/**
 * user controller : Methods for users
 */

const notificationModel = require("./model");

const statusCode = require("../../../utils/statusCode");
const statusMsg = require("../../../utils/statusCode");
const env = require("../../../utils/env");
const utility = require("../../../utils/utility");
const logger = require('../../../utils/logger');


var notificationController = {};


notificationController.pushNotification = async (req) => {
    let { invitedTo, deviceId } = req;
    try {
        let notification = await utility.sendNotification(deviceId);
        let _obj = {
            mobile: invitedTo,
            message: "Invitation for challenge"
        }
        let newNotification = await new notificationModel(_obj);
        let saveChallenge = await newNotification.save();
        return new Promise((resolve) => resolve(true));
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}


module.exports = notificationController;
