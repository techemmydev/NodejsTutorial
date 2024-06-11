const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
//middleware
app.use(morgan("dev"));
app.use(express.json());
//not actually neccesary for the static
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("hello from the middle ware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// //routing

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
