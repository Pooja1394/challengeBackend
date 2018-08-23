const { 
  readers: { eos: { NodeosActionReader } }, 
  watchers: { BaseActionWatcher }} = require('demux-js')

const ObjectActionHandler = require("./ObjectActionHandler")
const updaters = require("./updaters")
const effects = require("./effects")


const actionHandler = new ObjectActionHandler(
  updaters,
  effects,
)

const actionReader = new NodeosActionReader(
  "http://193.93.219.219:8888", // Thanks EOS Calgary!
  0, // Start at most recent blocks
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  500,
)

actionWatcher.watch()

module.exports = actionWatcher
