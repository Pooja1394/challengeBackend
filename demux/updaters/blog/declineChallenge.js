async function declineChallenge(state, payload, blockInfo) {
    logger.info('payload in Update '+JSON.stringify(payload.data))
    try{
      let declinedChallenge = await state.challenge.declineChallenge(payload.data);
      logger.success('Challenge Declined Successfully!!!');
    }catch(err){
      logger.error('Error in Updater');
    }
  }
  module.exports = declineChallenge;
  