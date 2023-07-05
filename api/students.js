const express = require("express");
const router = express.Router();
const { Students, Campuses } = require("../db/models");

// Root here is localhost:8080/api/students/
// Serve up all students
router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Students.findAll();
    allStudents
      ? res.status(200).json(allStudents)
      : res.status(404).send("Students List Not Found");
  } catch (error) {
    next(error);
  }
});

// Root here is localhost:8080/api/students/single
// Serve up a single student based on their id,
// and that student's campus
router.get("/single", async (req, res, next) => {
  try {
    const student = await Students.findByPk(req.query.pk);
    const campus = await Campuses.findByPk(student.campusId);
    student
      ? res.status(200).json({ student: student, campus: campus })
      : res.status(404).send("Student Not Found");
  } catch (error) {
    next(error);
  }
});

// Add a new student
router.post("/", async (req, res, next) => {
  try {
    const newStudent = {
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
      imageUrl: req.query.imageUrl,
      gpa: req.query.gpa,
    };
    // returns [new entry object, boolean whether just created or already existed]
    const insert = await Students.upsert(newStudent);
    res.json(insert[0]);
  } catch (error) {
    next(error);
  }
});

// Remove a student based on id
router.delete("/", async (req, res, next) => {
  try {
    const count = await Students.destroy({ where: { id: req.query.pk } });
    // number of rows deleted from table
    // one in this case due to primary key as param
    count
      ? res.status(200).send("Student Successfully Removed")
      : res.status(404).send("Student Does Not Exist");
  } catch (error) {
    next(error);
  }
});

// Edit a student based on id
router.put("/", async (req, res, next) => {
  try {
    const editStudent = {
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
      imageUrl: req.query.imageUrl,
      gpa: req.query.gpa,
      campusId: req.query.campusId,
    };
    const result = await Students.update(editStudent, {
      where: { id: req.query.pk },
    });
    // first element is the number of affected rows
    // one in this case due to primary key as where
    result[0]
      ? res.status(200).send("Student Successfully Updated")
      : res.status(404).send("Student Not Updated");
  } catch (error) {
    next(error);
  }
});

// Remove student from campus by setting campusId to null
router.put("/remove", async (req, res, next) => {
  try {
    const editStudent = {
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
      imageUrl: req.query.imageUrl,
      gpa: req.query.gpa,
      campusId: null,
    };
    const result = await Students.update(editStudent, {
      where: { id: req.query.pk },
    });
    // first element is the number of affected rows
    // one in this case due to primary key as where
    result[0]
      ? res.status(200).send("Student Successfully Removed From Campus")
      : res.status(404).send("Student Not Removed From Campus");
  } catch (error) {
    next(error);
  }
});

// Fetch total number of students registered
router.get("/count", async (req, res, next) => {
  try {
    const count = await Students.count();
    res.json(count);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
