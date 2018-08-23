
async function addchallenge(state, payload, blockInfo) {
  // console.log("payload = Effect =========>", payload);
  try {

    let { createdBy, invitedTo } = payload.data;
    //notification
    let user = state.user.findOne({ mobile: invitedTo.toString() });
    if (user) {
      //push notification 
      let notification = state.notification.pushNotification(payload.data);
      logger.success('Send Notification Successfully!!!');
    }
    else {
      //send message
      let _obj = {
        mobile: invitedTo,
        message: "Challenge App Invitation!"
      }
      let message = state.otp.sendMessage(_obj);
      logger.success('Send Message Successfully!!!');
    }
  } catch (err) {
    logger.error('Error in Effects ======>', err);
  }
}

module.exports = addchallenge;
