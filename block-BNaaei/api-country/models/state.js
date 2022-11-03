/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let stateSchema = new Schema(
  {
    name: { type: String, index: true },
    country: { type: Schema.Types.ObjectId, ref: "Country" },
    population: { type: Number },
    area: { type: Number },
    neighboringState: [{ type: Schema.Types.ObjectId, ref: "State" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model(`State`, stateSchema);
