const { handlers: { AbstractActionHandler } } = require('demux-js')

//all models
const user = require('../src/component/user/model');
const challenge = require('../src/component/challenge/controller');
const notification = require('../src/component/notification/controller');
const otp = require('../src/component/otp/controller');
const BlockIndexState = require('../src/component/blockIndex/model');

const state = { user: user, challenge: challenge, notification: notification, otp: otp, indexState: { blockNumber: 0, blockHash: "" } }

class ActionHandler extends AbstractActionHandler {

  async handleWithState(handle) {
    await handle(state)
  }

  async loadIndexState() {
    return state.indexState
  }

  async updateIndexState(stateObj, block) {
    stateObj.indexState.blockNumber = block.blockNumber
    stateObj.indexState.blockHash = block.blockHash
  }
}

module.exports = ActionHandler
