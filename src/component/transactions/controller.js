/**
 * Won Loss controller 
 */

const transactionsModel = require("./model");
const statusCode = require("../../../utils/statusCode");
const statusMsg = require("../../../utils/statusMsg");
const utility = require("../../../utils/utility");
const env = require("../../../utils/env");


var wonLostController = {};
wonLostController.wonLostChallenge = (data) => {
    try {
        let _obj = {
            challengeId: data.challengeId,
            challengeHash: data.challengeHash,
            winner: data.mobile,
            looser: data.looser,
            amount: data.amount,
        };
        let won = new transactionsModel(_obj);
        let saveWon = won.save();
        return new Promise(resolve => resolve(saveWon));
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}
wonLostController.getAllTransactions = async (req, res) => {
    let condition;
    try {
        let { type, mobile } = req.body;
        if (type === 'win') {
            condition = { winner: mobile.toString() };
        } else if (type === 'lost') {
            condition = { looser: mobile.toString() };
        }
        let transactions = await transactionsModel.find(condition);
        res.status(statusCode.ok).send(transactions);
    } catch (err) {
        res.status(statusCode.internal).send(err);
    }

}
module.exports = wonLostController;