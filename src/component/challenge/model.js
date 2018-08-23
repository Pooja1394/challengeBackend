const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const { Schema } = mongoose;
let Challenge = null;

const ChallengeSchema = new Schema(
  {
    challengeId: { type: String },
    createdBy: { type: String },
    createdByName: { type: String },
    invitedTo: { type: String },
    inviteToName: { type: String },
    daysLimit: { type: Number },
    dueDays: { type: Number },
    balance: { type: String },
    accepted: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    decline: { type: Boolean, default: false },
    free: { type: Boolean, default: false },
    failed: { type: Boolean, default: false },
    duration: { type: Number },
    createTime: { type: String },
    progressTime: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    signinStatus: { type: Boolean, default: false },
    singoutStatus: { type: Boolean, default: false },
    name: { type: String, default: 'Building Muscle' }
  },
  {
    timestamps: { createdAt: "createdAt", lastUpdated: "lastUpdated" }
  }
);
ChallengeSchema.plugin(autoIncrement.plugin, { model: "Challenge", field: "challengeId", startAt: 0, incrementBy: 1 })
Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;
