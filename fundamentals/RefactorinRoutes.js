const fs = require("fs");

const express = require("express");
const app = express();

//middleware
app.use(express.json());
// //routing
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "suceess",
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
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);

// app.get("/api/v1/tours/:id", getTour);

// // patch request from the server to update data
// app.patch("/api/v1/tours/:id", updateTour);

// // delet from the server backend
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
//server
const Port = 3000;
app.listen(Port, () => {
  console.log(`app running on port${Port}......`);
});
