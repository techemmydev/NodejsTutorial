const express = require("express");
const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "suceess",
    requested: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  // or you can do (!tours)
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Inavlid Id",
    });
  }
  res.status(200).json({
    status: "suceess",
    results: tours.length,
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "sucess",
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  // or you can do (!tours)
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Inavlid Id",
    });
  }
  res.status(200).json({
    status: "sucess",
    data: {
      tour: "<updated tours here .....>",
    },
  });
};
const deleteTour = (req, res) => {
  // or you can do (!tours)
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Inavlid Id",
    });
  }
  res.status(204).json({
    status: "sucess",
    data: null,
  });
};

const router = express.Router();

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
module.exports = router;
