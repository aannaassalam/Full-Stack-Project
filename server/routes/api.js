const express = require("express");
const router = express.Router();
const blackcoffer = require("../Model/blackcoffer_model");

router.get("/", (req, res) => {
  console.log("hit");
  blackcoffer
    .find()
    .then((items) => res.send(items))
    .catch((err) => res.status(400).send(err));
});

router.get("/filter_items", async (req, res) => {
  Promise.all([
    blackcoffer.distinct("start_year"),
    blackcoffer.distinct("end_year"),
    blackcoffer.distinct("topic"),
    blackcoffer.distinct("sector"),
    blackcoffer.distinct("region"),
    blackcoffer.distinct("pestle"),
    blackcoffer.distinct("source"),
    blackcoffer.distinct("country"),
    blackcoffer.distinct("city"),
  ])
    .then(
      ([
        start_year,
        end_year,
        topic,
        sector,
        region,
        pestle,
        source,
        country,
        city,
      ]) => {
        res.send({
          start_year: start_year.slice(1),
          end_year: end_year.slice(1),
          topic: topic.slice(1),
          sector: sector.slice(1),
          region: region.slice(1),
          pestle: pestle.slice(1),
          source: source.slice(1),
          country: country.slice(1),
          city: city.slice(1),
        });
      }
    )
    .catch((err) => console.log(err));
});

router.post("/filter_data", (req, res) => {
  const filters = req.body;
  const queries = Object.keys(filters).map((key) => {
    if (key === "end_year" || key === "start_year") {
      return { [key]: { $gte: filters[key][0], $lte: filters[key][1] } };
    } else {
      return { [key]: { $in: filters[key] } };
    }
  });
  blackcoffer
    .find()
    .and(queries)
    .then((items) =>
      res.send({
        count: items.length,
        items: items,
      })
    )
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
