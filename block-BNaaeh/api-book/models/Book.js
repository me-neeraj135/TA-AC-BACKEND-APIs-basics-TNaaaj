/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model(`V1`, bookSchema);
