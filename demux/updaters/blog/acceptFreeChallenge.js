acceptFreeChallenge = async (state, payload, blockInfo) => {
    logger.info('payload in Update '+JSON.stringify(payload.data))
    try {
        let addedChallenege = await state.challenge.acceptFreeChallenge(payload.data);
        logger.success('Free Challenge Accepted Successfully!!!');
    } catch (err) {
        logger.error('Error in Updater');
    }
}
module.exports = acceptFreeChallenge;