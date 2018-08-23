function parseTokenString(tokenString) {
  const [amountString, symbol] = tokenString.split(" ")
  const amount = parseFloat(amountString)
  return { amount, symbol }
}

function updateTransferData(state, payload, blockInfo, context) {
  console.log('hello')
  // const { amount, symbol } = parseTokenString(payload.data.quantity)
  // if (!state.volumeBySymbol[symbol]) {
  //   state.volumeBySymbol[symbol] = amount
  // } else {
  //   state.volumeBySymbol[symbol] += amount
  // }
  // state.totalTransfers += 1
}

const updaters = [
  {
    actionType: "prac1::decrement",
    updater: updateTransferData,
  },
  
]

module.exports = updaters
