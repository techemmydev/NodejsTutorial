const app = require("./app");

//server
const Port = 3000;
app.listen(Port, () => {
  console.log(`app running on port${Port}......`);
});
