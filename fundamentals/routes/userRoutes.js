const express = require("express");

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this routes is not yet defined",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this routes is not yet defined",
  });
};
const creatUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this routes is not yet defined",
  });
};
const updateUSer = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this routes is not yet defined",
  });
};
const deleteUSer = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this routes is not yet defined",
  });
};

const router = express.Router();

router.route("/").get(getAllUsers).post(creatUser);
router.route("/:id").get(getUser).patch(updateUSer).delete(deleteUSer);

module.exports = router;
