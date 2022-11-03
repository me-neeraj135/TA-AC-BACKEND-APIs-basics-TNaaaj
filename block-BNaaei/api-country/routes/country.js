/** @format */

let express = require(`express`);
let router = express.Router();
let Country = require(`../models/Country`);
let State = require(`../models/state`);

// all country

router.get(`/`, async (req, res, next) => {
  try {
    let countries = await Country.find({}).sort({ name: 1 });
    res.status(200).json({ countries: countries });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post(`/`, async (req, res, next) => {
  try {
    let country = await Country.create(req.body);
    res.status(200).json({ country: country });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(`/religion`, async (req, res, next) => {
  try {
    let religion = await Country.aggregate([
      { $unwind: "$ethnicity" },
      { $group: { _id: "$ethnicity", count: { $sum: 1 } } },
    ]);
    res.status(200).json({ religion: religion });
  } catch (error) {
    res.status(400).send(error);
  }
});

// list countries based on religions.

router.get(`/religionBased`, async (req, res, next) => {
  try {
    let country = await Country.aggregate([
      {
        $match: { ethnicity: "Christians" },
      },
    ]);

    res.status(200).json({ country: country });
  } catch (error) {
    res.status(400).send(error);
  }
});

// list countries based on continent.

router.get(`/continent`, async (req, res, next) => {
  try {
    let country = await Country.aggregate([
      {
        $match: { continent: "south America" },
      },
    ]);

    res.status(200).json({ country: country });
  } catch (error) {
    res.status(400).send(error);
  }
});
// list countries based on population.

router.get(`/population`, async (req, res, next) => {
  try {
    let country = await Country.aggregate([
      {
        $match: { population: 669526 },
      },
    ]);

    res.status(200).json({ country: country });
  } catch (error) {
    res.status(400).send(error);
  }
});

// update/ a country

router.put(`/:id`, async (req, res, next) => {
  try {
    let updated = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ country: updated });
  } catch (error) {
    res.status(400).send(error);
  }
});

// find by id

router.get(`/:id`, async (req, res, next) => {
  try {
    let country = await Country.findById(req.params.id);
    res.status(200).json({ country: country });
  } catch (error) {
    res.status(400).send(error);
  }
});
// delete country

router.delete(`/:id`, async (req, res, next) => {
  try {
    let deleted = await Country.findByIdAndDelete(req.params.id);
    res.status(200).json({ country: deleted });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
