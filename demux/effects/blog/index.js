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
    effect: addchallenge
  },
  {
    actionType: `${env.contractName}::decline`,
    effect: declineChallenge
  },
  {
    actionType: `${env.contractName}::acceptch`,
    effect: acceptFreeChallenge
  },
  {
    actionType: `${env.contractName}::owchacceptch`,
    effect: acceptPaidChallenge
  },
  {
    actionType: `${env.contractName}::signin`,
    effect: signInChallenge
  },
  {
    actionType: `${env.contractName}::signout`,
    effect: signOutChallenge
  },
  {
    actionType: `${env.contractName}::trans`,
    effect: transferTransaction
  },
  {
    actionType: `${env.contractName}::refundc`,
    effect: refundTransaction
  }

]
