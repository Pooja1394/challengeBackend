/**
 * TimeLog controller 
 */

const timeLogModel = require("./model");
const statusCode = require("../../../utils/statusCode");
const statusMsg = require("../../../utils/statusMsg");
const utility = require("../../../utils/utility");
const env = require("../../../utils/env");


var timeLogController = {};
timeLogController.checkInCheckOutTime = (data) => {
    try {
        let condition = { date: data.date, _id: data.challengeHash, name: data.name };
        let timeLog = timeLogModel.findOneAndUpdate(condition, { $set: data.setObj }, { upsert: true, new: true })
        return new Promise(resolve => resolve(timeLog));
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}
module.exports = timeLogController;