const { 
    readers: { eos: { NodeosActionReader } }, 
    watchers: { BaseActionWatcher }} = require('demux-js')
  
const ActionHandler = require('./ActionHandler');


const updaters = require('./updaters')
const effects = require('./effects')

const actionHandler = new ActionHandler(updaters, effects)

const actionReader = new NodeosActionReader(
    process.env.EOSIO_HTTP_URL_TEST,
    0// First actions relevant to this dapp happen at this block
)

const actionWatcher = new BaseActionWatcher(
actionReader,
actionHandler,
500 // Poll at twice the block interval for less latency
)

actionWatcher.watch();
module.exports = actionWatcher
  