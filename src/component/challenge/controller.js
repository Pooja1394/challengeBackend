/**
 * challenge controller : Methods for challenge
 */

const challengeModel = require("./model");
const userModel = require("../user/model");
const statusCode = require("../../../utils/statusCode");
const statusMsg = require("../../../utils/statusMsg");
const utility = require("../../../utils/utility");
const env = require("../../../utils/env");
const contributChallenge = require("../contribution/controller");
const transactionsController = require("../transactions/controller");
const timeLog = require("../timeLog/controller");

var challengeController = {};

//DEMUX METHODS
challengeController.addChallenge = async (req) => {
    let { createdBy, invitedTo, balance, free, duration, startDate, endDate } = req;
    try {
        // let _start = utility.unixTimeToDate(startDate);
        // let _end = utility.unixTimeToDate(endDate);
        let user = await userModel.findOne({ mobile: createdBy.toString() });
        if (user) {
            let challenge = {
                createdBy: createdBy.toString(),
                createdByName: user.userName,
                invitedTo: invitedTo.toString(),
                balance: balance,
                free: free ? true : false,
                duration: duration,
                // startDate: _start.getFullYear() + "/" + _start.getMonth() + "/" + _start.getDate(),
                // endDate: _end.getFullYear() + "/" + _end.getMonth() + "/" + _end.getDate()
                startDate: utility.unixTimeInJsTime(startDate),
                endDate: utility.unixTimeInJsTime(endDate),
            }
            let newChallenge = new challengeModel(challenge);
            let saveChallenge = await newChallenge.save();
            if (saveChallenge) {
                let contributeData = {
                    accountName: saveChallenge.createdBy.toString(),
                    amount: saveChallenge.balance
                }
                let contribute = await contributChallenge.addContribute(contributeData);
                return new Promise(resolve => resolve(saveChallenge));
            }
        } else {
            return new Promise(resolve => resolve('no user'));
        }

    } catch (err) {
        console.log('err => add chalenege ', err)
        return new Promise((resolve, reject) => reject(err));
    }
}

challengeController.declineChallenge = async (req) => {
    let { id, invitedTo, hash } = req;
    try {
        let challenge = await challengeModel.findOneAndUpdate({ _id: hash, challengeId: id }, { $set: { decline: true } }, { new: true });
        if (challenge) {
            let obj = {
                accountName: challenge.createdBy.toString(),
                amount: challenge.balance
            }
            let contribute = await contributChallenge.subtractContribute(obj);
            return new Promise(resolve => resolve(contribute));
        }

    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}

challengeController.acceptFreeChallenge = async (req) => {
    let { id, invitedTo, hash, invitedToName } = req;
    try {
        let challenge = await challengeModel.findOneAndUpdate({ _id: hash, challengeId: id }, { $set: { accepted: true, invitedToName: invitedToName } });
        return new Promise(resolve => resolve(challenge));
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}

challengeController.acceptPaidChallenge = async (req) => {
    let { id, invitedTo, balance, hash, invitedToName } = req;
    try {
        let challenge = await challengeModel.findOneAndUpdate({ _id: hash, challengeId: id }, { $set: { accepted: true, invitedToName: invitedToName } });
        if (challenge) {
            let contributeData = {
                accountName: invitedTo.toString(),
                amount: balance
            }
            let contribute = await contributChallenge.addContribute(contributeData);
            return new Promise(resolve => resolve(challenge));
        }

    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}

challengeController.signInChallenge = async (req) => {
    let { id, invitedTo, hash } = req.body;
    try {
        let tableData = await utility.readTable(env.challengeTable);
        let readTable = await tableData.find((value) => value.id === id);
        let challenge = await challengeModel.findOneAndUpdate({ _id: hash, challengeId: id }, { $set: { signinStatus: true, progressTime: readTable.progressTime } });
        let _start = utility.unixTimeToDate(readTable.progressTime);
        let _obj = {
            date: _start.getFullYear() + "/" + _start.getMonth() + "/" + _start.getDate(),
            challengeHash: challenge._id,
            setObj: {
                challengeId: challenge.challengeId,
                challengeHash: challenge._id,
                logInTime: readTable.progressTime,
            }
        }
        let logTime = await timeLog.checkInCheckOutTime(_obj);
        return new Promise(resolve => resolve(logTime));
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}

challengeController.signOutChallenge = async (req) => {
    let { id, invitedTo, hash } = req.body;
    try {
        let tableData = await utility.readTable(env.challengeTable);
        let readTable = await tableData.find((value) => value.id === id);
        let challenge = await challengeModel.findOneAndUpdate({ _id: hash, challengeId: id }, { $set: { signinStatus: false, singoutStatus: true, progressTime: readTable.progressTime } });
        let _start = utility.unixTimeToDate(readTable.progressTime);
        let _obj = {
            date: _start.getFullYear() + "/" + _start.getMonth() + "/" + _start.getDate(),
            challengeHash: challenge._id,
            name: challenge.invitedTo,
            setObj: {
                logInTime: readTable.progressTime,
            }
        }
        let logTime = await timeLog.checkInCheckOutTime(_obj);
        return new Promise(resolve => resolve(logTime));
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}

challengeController.transferTransaction = async (req) => {
    let { id, hash, invitedTo } = req;
    try {
        let challenge = await challengeModel.findOneAndUpdate({ _id: hash, challengeId: id }, { $set: { completed: true } }, { new: true });
        let winlostObj = {
            challengeId: id,
            challengeHash: hash,
            amount: challenge.balance,
            winner: invitedTo.toString(),
            looser: challenge.createdBy.toString()
        }
        if (challenge.free) {
            let obj = {
                accountName: challenge.createdBy.toString(),
                amount: challenge.balance
            }
            let contribute = await contributChallenge.subtractContribute(obj);
            let wonChallenge = await transactionsController.wonLostChallenge(winlostObj)
            return new Promise(resolve => resolve(wonLostChallenge));
        }
        else {
            let obj = {
                accounts: [challenge.createdBy.toString(), challenge.invitedTo.toString()],
                amount: challenge.balance
            }
            let contribute = await contributChallenge.multipleSubtractContribution(obj);
            let wonLostChallenge = await transactionsController.wonLostChallenge(winlostObj)
            return new Promise(resolve => resolve(wonLostChallenge));
        }
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}

challengeController.refundTransaction = async (req) => {
    let { id, hash, createdBy } = req;
    try {
        let tableData = await utility.readTable(env.challengeTable);
        let readTable = await tableData.find((value) => value.id === id);
        let _setObj = {
            "accepted": readTable.accepted ? true : false,
            "decline": readTable.decline ? true : false,
            "failed": readTable.failed ? true : false
        }
        let challenge = await challengeModel.findOneAndUpdate({ _id: hash, challengeId: id }, { $set: _setObj }, { new: true });
        let winlostObj = {
            challengeId: id,
            challengeHash: hash,
            amount: challenge.balance,
            winner: invitedTo.toString(),
            looser: challenge.createdBy.toString()
        }
        if (challenge.free) {
            let obj = {
                accountName: challenge.createdBy.toString(),
                amount: challenge.balance
            }
            let contribute = await contributChallenge.subtractContribute(obj);
            let wonLostChallenge = await transactionsController.wonLostChallenge(winlostObj)
            return new Promise(resolve => resolve(contribute));
        }
        else {
            let obj = {
                accounts: [challenge.createdBy, challenge.invitedTo],
                amount: challenge.balance
            }
            let contribute = await contributChallenge.multipleSubtractContribution(obj);
            let wonLostChallenge = await transactionsController.wonLostChallenge(winlostObj)
            return new Promise(resolve => resolve(contribute));
        }
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}

//Direct APIs For Front_End
challengeController.getCurrentDateAndTime = async (req, res) => {
    try {
        let date = await utility.dateToUnixTime(new Date());
        console.log("date  ", date)
        res.status(statusCode.ok).send({ date: date });
    } catch (err) {
        res.status(statusCode.internal).send(err);
    }
}

challengeController.getMyAssingedChallenges = async (req, res) => {
    let { type, mobile } = req.body;
    let condition = {};
    if (type === 'allChallenges') {
        condition = {
            invitedTo: mobile,
            $or: [{ accepted: false }, { decline: true }, { failed: true }]
        }
    } else if (type === 'active') {
        condition = { invitedTo: mobile, accepted: true, decline: false, failed: false }
    }
    else if (type === 'completed') {
        condition = { invitedTo: mobile, accepted: true, completed: true }
    }
    try {
        let results = await challengeModel.find(condition);
        res.status(statusCode.ok).send(results);
    } catch (err) {
        res.status(statusCode.internal).send(statusMsg.internal);
    }
}

challengeController.getMyCreatedChallenges = async (req, res) => {
    let { mobile } = req.body;
    if (mobile) {
        try {
            let myChallenge = await challengeModel.find({ createdBy: mobile });
            res.status(statusCode.ok).send(myChallenge);
        } catch (err) {
            res.status(statusCode.internal).send(statusMsg.internal);
        }
    } else {
        res.status(statusCode.bad).send(statusMsg.bad);
    }
}

// challengeController.getAllTransactions = async (req, res) => {
//     try {
//         let transaction = await transactionsController.getAllTransactions(req.body);
//         res.status(statusCode.ok).send(transaction);
//     } catch (err) {
//         res.status(statusCode.internal).send(err);
//     }
// }


module.exports = challengeController;
