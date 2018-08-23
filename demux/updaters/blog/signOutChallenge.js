signOutChallenge = async (state, payload, blockInfo) => {
    logger.info('payload in Update ' + JSON.stringify(payload.data))
    try {
        let _signOutChallenge = await state.challenge.signOutChallenge(payload.data);
        logger.success(' signOutChallenge Successfully!!!');
    } catch (err) {
        logger.error('Error in Updater');
    }
}
module.exports = signOutChallenge;