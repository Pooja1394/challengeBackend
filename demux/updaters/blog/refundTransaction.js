refundTransaction = async (state, payload, blockInfo) => {
    logger.info('payload in Update '+JSON.stringify(payload.data))
    try {
        let _refundTransaction = await state.challenge.refundTransaction(payload.data);
        logger.success('Refund Successfully!!!');
    } catch (err) {
        logger.error('Error in Updater,', err);
    }
}
module.exports = refundTransaction;