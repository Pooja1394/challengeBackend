acceptPaidChallenge = async (state, payload, blockInfo) => {
    logger.info('payload in Update '+JSON.stringify(payload.data))
    try {
        let acceptPaidChallenge = await state.challenge.acceptPaidChallenge(payload.data);
        logger.success('Paid Challenge Accepted Successfully!!!');
    } catch (err) {
        logger.error('Error in Updater,', err);
    }
}
module.exports = acceptPaidChallenge;