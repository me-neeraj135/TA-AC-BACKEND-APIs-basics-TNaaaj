/** @format */

let express = require(`express`);
let router = express.Router();
let Country = require(`../models/Country`);
let State = require(`../models/state`);

router.post(`/`, async (req, res, next) => {
  try {
    let state = await State.create(req.body);
    res.status(200).json({ state: state });
  } catch (error) {
    res.send(error);
  }
});

router.get(`/`, async (req, res, next) => {
  try {
    let states = await State.find({})
      .populate(`country`)
      .sort({ population: 1 });
    res.status(200).json({ states: states });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(`/country/:id`, async (req, res, next) => {
  try {
    let country = await Country.findById(req.params.id).populate(
      ` neighboringCountries`
    );
    res.status(200).json({ country: country });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(`/:id`, async (req, res, next) => {
  try {
    let nvrState = await State.findById(req.params.id).populate(
      ` neighboringState`
    );
    res.status(200).json({ state: nvrState });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
