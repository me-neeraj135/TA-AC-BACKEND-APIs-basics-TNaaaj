/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let countrySchema = new Schema(
  {
    name: { type: String, index: true },
    state: [{ type: Schema.Types.ObjectId, ref: "State" }],
    continent: { type: String },
    population: { type: Number },
    ethnicity: [{ type: String }],
    area: { type: Number },
    neighboringCountries: [{ type: Schema.Types.ObjectId, ref: "Country" }],
  },
  { timestamps: true }
);

countrySchema.index({ name: 1 });

module.exports = mongoose.model(`Country`, countrySchema);
