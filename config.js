var express = require('express');
var app = express();
module.exports={
    db:{
        uri:process.env.MONGODB_URL_TEST,
    },
    prodDb:{
        uri:process.env.MONGODB_URL_PROD,
    },
    token: {
        TOKEN_SECRET: process.env.TOKEN_SECRET_A || 'firstblockchainproject',
        EXPIRY: process.env.EXPIRY || 3600,
    },
}