
async function addchallenge(state, payload, blockInfo) {
  // logger.info('payload in Update '+JSON.stringify(payload.data))
  try {
    let addedChallenege = await state.challenge.addChallenge(payload.data);
    logger.success('Challenge Added Successfully!!!');
  } catch (err) {
    logger.error('Error in Updater ======>', err);
  }
}
module.exports = addchallenge;
