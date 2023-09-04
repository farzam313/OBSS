const express = require("express");
const router = require("./routes/Data_insert");
const login = require("./routes/login");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the allowed origin(s)
    methods: "POST , PATCH , OPTIONS", // Allowed HTTP methods
    allowedHeaders: "Content-Type", // Allowed headers
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router, (res, err) => {});
app.use(login, () => {});
// app.use((req, res, next) => {
//   // res.setHeader("Access-Control-Allow-Origin", "*");
//   const headers = {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
//     "Access-Controll-Allow-Headers": "Content-Type",
//     "Access-Controll-Allow-Origin": "http://localhost:3001",
//   };
//   res.setHeader(headers);

//   next();
// });

app.listen(5000, () => {
  console.log("Server is Running on port number: 5000 ");
});
