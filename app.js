const express = require("express");
const router = require("./routes/Data_insert");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log("Server is started at port: 3000 ");
});
