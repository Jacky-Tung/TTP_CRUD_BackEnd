const express = require("express");
const router = express.Router();
const { Campuses, Students } = require("../db/models");

// Root here is localhost:8080/api/campuses/
// Serve up all campuses
router.get("/", async (req, res, next) => {
  try {
    const allCampuses = await Campuses.findAll();
    allCampuses
      ? res.status(200).json(allCampuses)
      : res.status(404).send("Campuses Listing Not Found");
  } catch (error) {
    next(error);
  }
});

// Root here is localhost:8080/api/campuses/single
// Serve up a single campus based on id,
// and that campuses' students
router.get("/single", async (req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.query.pk);
    const students = await Students.findAll({
      where: { campusId: req.query.pk },
    });
    campus
      ? res.status(200).json({ campus: campus, students: students })
      : res.status(404).send("Campus Not Found");
  } catch (error) {
    next(error);
  }
});

// Add a new campus
router.post("/", async (req, res, next) => {
  try {
    const newCampus = {
      name: req.query.name,
      address: req.query.address,
    };
    // returns [new entry object, boolean whether just created or already existed]
    const insert = await Campuses.upsert(newCampus);
    res.json(insert[0]);
  } catch (error) {
    next(error);
  }
});

// Remove a campus based on its id
router.delete("/", async (req, res, next) => {
  try {
    const count = await Campuses.destroy({ where: { id: req.query.pk } });
    // number of rows deleted from table
    // one in this case due to primary key as param
    count
      ? res.status(200).send("Campus Successfully Removed")
      : res.status(404).send("Campus Does Not Exist");
  } catch (error) {
    next(error);
  }
});

// Fetch total number of campuses registered
router.get("/count", async (req, res, next) => {
  try {
    const count = await Campuses.count();
    res.json(count);
  } catch (error) {
    next(error);
  }
});

module.exports = router;