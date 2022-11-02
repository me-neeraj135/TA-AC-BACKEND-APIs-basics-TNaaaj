/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let commentSchema = new Schema({
  comment: { type: String, required: true },
  commenter: { type: String, required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book" },
});

module.exports = mongoose.model(`Comment`, commentSchema);
