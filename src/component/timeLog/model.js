const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const { Schema } = mongoose;
let TimeLog = null;

const TimeLogSchema = new Schema(
    {
        challengeId: { type: String },
        challengeHash: { type: String },
        logInTime: { type: String },
        logOutTime: { type: String },
        name: { type: String }
    },
    {
        timestamps: { createdAt: "createdAt", lastUpdated: "lastUpdated" }
    }
);
TimeLog = mongoose.model("Timelog", TimeLogSchema);

module.exports = TimeLog;
