const mongoose = require("mongoose");
const config = require('../../../config');

const { Schema } = mongoose;

let Otp = null;

const OtpSchema = new Schema(
    {
        mobile: { type: String },
        otp: { type: String }
    },
    {
        timestamps: { createdAt: "createdAt", lastUpdated: "lastUpdated" }
    }
);

Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;