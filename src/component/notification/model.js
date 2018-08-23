const mongoose = require("mongoose");
const config = require('../../../config');

const { Schema } = mongoose;

let Notification = null;

const NotificationSchema = new Schema(
    {
        mobile: { type: String },
        new: { type: Boolean, default: true },
        message: { type: String }
    },
    {
        timestamps: { createdAt: "createdAt", lastUpdated: "lastUpdated" }
    }
);

Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;