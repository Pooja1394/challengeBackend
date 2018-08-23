/**
 * Contribute controller 
 */

const contributeModel = require("./model");
const statusCode = require("../../../utils/statusCode");
const statusMsg = require("../../../utils/statusMsg");
const utility = require("../../../utils/utility");
const env = require("../../../utils/env");

var contributeController = {};

contributeController.addContribute = async (data) => {
    try {
        let condition = { accountName: data.accountName };
        let checkContribute = await contributeModel.findOne(condition);
        if (checkContribute) {
            let _update = { amount: parseFloat(checkContribute.amount) + parseFloat(data.amount) };
            let updated = await contributeModel.update(condition, { $set: _update });
            return new Promise(resolve => resolve(true));
        }
        else {
            let newContribute = {
                accountName: data.accountName,
                amount: parseFloat(data.amount)
            }
            let contributeInstance = new contributeModel(newContribute);
            let saveInstance = await contributeInstance.save();
            return new Promise(resolve => resolve(true));
        }
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }

}

contributeController.subtractContribute = async (data) => {
    try {
        let condition = { accountName: data.accountName };
        let checkContribute = await contributeModel.findOne(condition);
        if (checkContribute) {
            let _update = { amount: parseFloat(checkContribute.amount) - parseFloat(data.amount) };
            let updated = await contributeModel.update(condition, { $set: _update });
            console.log('_update = ', updated)
            return new Promise(resolve => resolve(true));
        }
        else {
            return new Promise((resolve, reject) => reject('Not subtract'));
        }
    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}

contributeController.multipleSubtractContribution = async (data) => {
    try {

        let result = await data.accounts.map(async (value) => {
            console.log('in map')
            let condition = { accountName: value };
            let checkContribute = await contributeModel.findOne(condition);
            if (checkContribute) {
                let _update = { amount: parseFloat(checkContribute.amount) - parseFloat(data.amount) };
                let updated = await contributeModel.update(condition, { $set: _update });
                // console.log('_update = ', updated)
                // return new Promise(resolve => resolve(true));
            }
            // else {
            //     return new Promise((resolve, reject) => reject('Not subtract'));
            // }
        });
        console.log('in exit', result);
        if(result){
            return new Promise(resolve => resolve(true));
        }

    } catch (err) {
        return new Promise((resolve, reject) => reject(err));
    }
}
module.exports = contributeController;