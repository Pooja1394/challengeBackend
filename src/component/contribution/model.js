const mongoose = require("mongoose");

const { Schema } = mongoose;
let Contribution = null;


const ContributionSchema = new Schema( 
  {
    accountName: { type: String },
    amount: { type: Number  },
  },
  {
    timestamps: { createdAt: "createdAt", lastUpdated: "lastUpdated" }
  }
);
Contribution = mongoose.model("Contribution", ContributionSchema);

module.exports = Contribution;

