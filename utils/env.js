/**
 * env : constants
 */
const EOS = require('eosjs');
var express = require('express');
var app = express();


//keys for development
if (app.get('env') === 'local' || app.get('env') === 'development') {

    //Details : Twilio
    var accountSid = 'ACdc5847815bf3c5898c35ccd711259afc';
    var authToken = 'df7dc3016f462d7d0ccfce8678b64d8c';

    //Details : FCM (Notification)

    var serverKey = "AAAAdFbz3V0:APA91bHhlQIk0-8vawR4ajav6Hsjgj-Nn5HEjp5GFXkl0KMUFZycnQDRz-JPS65IK0xWEBPioFo4UnSsPqx_Ts4hq3Pfj898-oaZu8xVbqt8XtJHskmnm1t8pgq7eR0U5j3HdMeqsfYKDHS1Ld2JUiHB9u_qHvNtMw"

    //Details : Contract
    var contractName = process.env.EOSIO_CONTRACT_ACCOUNT_TEST;
    var contractUrl = process.env.EOSIO_HTTP_URL_TEST;
    var challengeTable = process.env.CHALLENGE_TABLE_TEST;

    //Details : Auto Incremented Id
    // var connection = 

    //Details : EOS
    var chainId= "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";
    var config = {
        chainId: chainId,
        keyProvider: [process.env.PRIVATE_TEST_KEY], // WIF string or array of keys..
        httpEndpoint: process.env.EOSIO_HTTP_URL_TEST,
        expireInSeconds: 60,
        broadcast: true,
        verbose: false, // API activity
        sign: true
    }
    var eos = EOS(config);

}

//keys for production
if (app.get('env') === 'production') {
    //Details : Twilio
    var accountSid = 'ACdc5847815bf3c5898c35ccd711259afc';
    var authToken = 'df7dc3016f462d7d0ccfce8678b64d8c';

    //Details : FCM (Notification)

    var serverKey = "AAAAY80w8f8:APA91bFIncmd0UDGBxYF60gbtWw-QE75mAr6I7zoiQAXdTt77daCG4v8fZ3WP7hbY4XEOPP_HhQPRiFyOtjJzmP4Z7dq4hKG9fujaCEOliZ1IbBLMQh6rdqY3vMm7ioSCLzwWAjXYZrFZLJD-w_UX45_lxZSknq6Kw"

    //Details : Contract
    var contractName = process.env.EOSIO_CONTRACT_ACCOUNT_PROD;
    var contractUrl = process.env.EOSIO_HTTP_URL_PROD;

    //Details : Table Name
    var challengeTable = process.env.CHALLENGE_TABLE_PROD;
}

module.exports = {
    accountSid: accountSid,
    authToken: authToken,
    serverKey:serverKey,
    contractName:contractName,
    contractUrl:contractUrl,
    challengeTable:challengeTable,
    config:config,
    eos:eos
};