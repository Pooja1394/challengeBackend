const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const { Schema } = mongoose;
let WonLost = null;

const WonLostSchema = new Schema(
    {
        challengeId: { type: String },
        challengeHash: { type: String },
        winner: { type: String },
        looser: { type: String },
        amount: { type: String },
    },
    {
        timestamps: { createdAt: "createdAt", lastUpdated: "lastUpdated" }
    }
);
WonLost = mongoose.model("WonLost", WonLostSchema);

module.exports = WonLost;
