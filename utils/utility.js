/**
 * Common Methods
 */

const env = require('./env');
const axios = require('axios');


// send notification
exports.sendNotification = async (data) => {
    const body = {
        "registration_ids": ['cLbceOEW9Ws:APA91bE7b-WNxiQekrhFmxReApDtpCTVAWFJqFothByNuCdK1ws2JiqLhsjENYAbcEQq7E4AhP4xG1qInOn454ZdIvPDM2belQPRqSMw9SpvKbUf44zxh1jvcoVKRKDEJzanqlL5pFCpo2Fosi7B1d3o1BqjRzrKnw'],
        "data": {
            "type": "test_type",
            "tab": "test_tab",
            "link": "https://fcm.googleapis.com/fcm/send",
            "title": "test_title",
            "message": "Invitation for challenge",
        },
        "priority": "high",
        "content_available": true,
        "mutable_content": true,
        "click_action": "FCM_PLUGIN_ACTIVITY"
    };
    try {
        let notify = await axios({
            url: 'https://fcm.googleapis.com/fcm/send',
            method: 'POST',
            headers: { "Content-Type": 'application/json', "Authorization": "Key=" + env.serverkey },
            data: body
        });
        return new Promise(resolve => resolve(notify))
    } catch (err) {
        return new Promise((resolve, rejects) => rejects(err));
    }
}
//read EOS tabel
exports.readTable = async (data) => {

    let _body = {
        code: env.contractName,
        scope: env.contractName,
        table: data,
        json: true
    }
    try {
        let table = await axios({
            url: env.contractUrl + '/v1/chain/get_table_rows',
            method: 'POST',
            data: _body
        });
        return new Promise(resolve => resolve(table.data.rows));
    } catch (err) {
        return new Promise((resolve, reject) => reject(err))
    }
}

//convert date into unix time
exports.dateToUnixTime = (date) => {
    return new Date(date).getTime() / 1000;
}

//convert unix time into date
exports.unixTimeToDate = (time) => {
    return new Date(time * 1000);
}

exports.unixTimeInJsTime = (time) => {
    return (time * 1000);
}

exports.JsTimeInunixTime = (time) => {
    return (time / 1000);
}