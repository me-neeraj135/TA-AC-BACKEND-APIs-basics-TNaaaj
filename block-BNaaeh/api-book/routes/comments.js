/** @format */

let express = require(`express`);
let router = express.Router();
let Book = require(`../models/Book`);
let Comment = require(`../models/Comment`);

router.post(`/:id`, async (req, res, next) => {
  try {
    let cmt = await Comment.create(req.body);
    let book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comment: cmt.id },
      },
      { new: true }
    ).populate(`comment`);
    res.status(200).json({ book: book });
  } catch (error) {
    res.status(400).send(error);
  }
});

// update comment

router.put(`/:id`, async (req, res, next) => {
  try {
    let updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ comment: updatedComment });
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete comment

router.delete(`/:id`, async (req, res, next) => {
  try {
    let deleteComment = await Comment.findByIdAndDelete(req.params.id);
    let book = await Book.findByIdAndUpdate(
      deleteComment.bookId,
      {
        $pull: { comment: req.params.id },
      },
      { new: true }
    );
    res.status(200).json({ comment: deleteComment });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
