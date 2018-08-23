const env = require('../../../utils/env');
const addchallenge= require('./addchallenge');
const declineChallenge= require('./declineChallenge');
const acceptFreeChallenge= require('./acceptFreeChallenge');
const acceptPaidChallenge= require('./acceptPaidChallenge');
const signInChallenge= require('./signInChallenge');
const signOutChallenge= require('./signOutChallenge');
const transferTransaction= require('./transferTransaction');
const refundTransaction= require('./refundTransaction');

module.exports = [
  {
    actionType: `${env.contractName}::addchallenge`,
    updater: addchallenge
  },
  {
    actionType: `${env.contractName}::decline`,
    updater: declineChallenge
  },
  {
    actionType: `${env.contractName}::owchacceptch`,
    updater: acceptFreeChallenge
  },
  {
    actionType: `${env.contractName}::acceptch`,
    updater: acceptPaidChallenge
  },
  {
    actionType: `${env.contractName}::signin`,
    updater: signInChallenge
  },
  {
    actionType: `${env.contractName}::signout`,
    updater: signOutChallenge
  },
  {
    actionType: `${env.contractName}::trans`,
    updater: transferTransaction
  },
  {
    actionType: `${env.contractName}::refundc`,
    updater: refundTransaction
  }

]
