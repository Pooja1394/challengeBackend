/**
 * user controller : Methods for users
 */



const userModel = require("./model");
const statusCode = require("../../../utils/statusCode");
const statusMsg = require("../../../utils/statusMsg");
const env = require("../../../utils/env");


var userController = {};
userController.setUpAccount = async (req, res) => {
  if (req.body.accountName && req.body.mobile && req.body.userName) {
    try {
      let userData = await userModel.findOne({ mobile: req.body.mobile.toString()});
      if (userData) {
        res.status(statusCode.found).send(statusMsg.found);
      } else {
        let _obj = {
          accountName: req.body.accountName,
          mobile: req.body.mobile.toString(),
          userName:req.body.userName
        }
        let newUser = new userModel(_obj);
        let save = await newUser.save(newUser);
        if (save) {
          let token = await userModel.encode({ accountName: req.body.accountName, mobile: req.body.mobile.toString() });
          let newDecode = await userModel.decode(token);
          let _send = {
            token: token,
            expiry: newDecode.exp
          }
          let addAccount = await env.eos.transaction(
            {
              actions: [
                {
                  account: env.contractName,
                  name: 'addaccount',
                  authorization: [{
                    actor: env.contractName,
                    permission: 'active'
                  }],
                  data: {
                    registerd:req.body.accountName,
                    number:req.body.mobile,
                  }
                }
              ]
            }
          );
          res.status(statusCode.ok).send(_send);
        }
      }
    } catch (err) {
      res.status(statusCode.internal).send(err);
    }
  } else {
    res.status(statusCode.bad).send(statusMsg.bad);
  }
};

module.exports = userController;
