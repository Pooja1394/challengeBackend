const user = require('./component/user/route');
const otp = require('./component/otp/route');
const challenge = require('./component/challenge/route');
const transaction = require('./component/transactions/route');

// const demux1 = require('./demux1');
const demux = require("../demux");

module.exports = (app) =>{
    app.use('/user', user);
    app.use('/otp', otp);
    app.use('/challenge',challenge)
    app.use('/transaction',transaction)
}