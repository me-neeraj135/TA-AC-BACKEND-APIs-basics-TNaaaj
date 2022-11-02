/** @format */

let express = require(`express`);
let router = express.Router();

let Book = require(`../models/Book`);

let Comment = require(`../models/Comment`);

// get book all book

router.get(`/`, async (req, res, next) => {
  try {
    let books = await Book.find({});
    res.status(200).json({ books: books });
  } catch (error) {
    res.status(400).send(error);
  }
});

// create book

router.post(`/`, async (req, res, next) => {
  try {
    let newBook = await Book.create(req.body);
    res.status(200).redirect(`/api/v1/books`);
  } catch (error) {
    res.status(400).json(error);
  }
});

// find single book

router.get(`/:id`, async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);
    res.status(200).json({ book: book }, "title description author");
  } catch (error) {
    res.status(400).send(error);
  }
});

// update book

router.put(`/:id`, async (req, res, next) => {
  try {
    let updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ book: updatedBook });
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete book

router.delete(`/:id`, async (req, res, next) => {
  try {
    let deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ book: deletedBook });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
