signInChallenge = async (state, payload, blockInfo) => {
    logger.info('payload in Update '+JSON.stringify(payload.data))
    try {
        let _signInChallenge = await state.challenge.signInChallenge(payload.data);
        logger.success(' signInChallenge Successfully!!!');
    } catch (err) {
        logger.error('Error in Updater');
    }
}
module.exports = signInChallenge;