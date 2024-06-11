const fs = require("fs");

const express = require("express");
const app = express();

//middleware
app.use(express.json());
// //routing
// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "hello from the server side", app: "natours project" });
//   // .send("hello from the server side this is my first server code");
// });
// app.post("/", (req, res) => {
//   res.status(200).json("hope you re good now");
// });
//
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "suceess",
    results: tours.length,
    data: {
      tours,
    },
  });
});
//using URL parameter
//optional parameter "/api/v1/tours/:id/:x/:y?" not neccessary in use
app.get("/api/v1/tours/:id", (req, res) => {
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
});

// handling a post request from the backend server because no database yet
app.post("/api/v1/tours", (req, res) => {
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
});

// patch request from the server to update data
app.patch("/api/v1/tours/:id", (req, res) => {
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
});

// delet from the server backend
app.delete("/api/v1/tours/:id", (req, res) => {
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
});

//server
const Port = 3000;
app.listen(Port, () => {
  console.log(`app running on port${Port}......`);
});
