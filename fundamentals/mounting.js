const fs = require("fs");

const express = require("express");
const morgan = require("morgan");
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("hello from the middle ware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// //routing
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

const tourRouter = express.Router();
const userRouter = express.Router();
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(creatUser);
userRouter.route("/:id").get(getUser).patch(updateUSer).delete(deleteUSer);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
//server
const Port = 3000;
app.listen(Port, () => {
  console.log(`app running on port${Port}......`);
});
