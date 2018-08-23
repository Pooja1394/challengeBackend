transferTransaction = async (state, payload, blockInfo) => {
    logger.info('payload in Update '+JSON.stringify(payload.data))
    try {
        let transferTransaction = await state.challenge.transferTransaction(payload.data);
        logger.success('Transfer Successfully!!!');
    } catch (err) {
        logger.error('Error in Updater,', err);
    }
}
module.exports = transferTransaction;