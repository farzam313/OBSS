const express = require("express");
const rout = express.Router();
const { userModel, insert_book_user } = require("../Modules/user");
const { bookModel } = require("../Modules/book");
const { queryAsync, connectAsync } = require("../Modules/connection");

rout.post("/users", async (req, res) => {
  data = req.body;

  try {
    const insertUserResponse = await userModel(data);
    if (!insertUserResponse && !insertUserResponse.success) {
      res.send({
        message: "Something went wrong",
        success: false,
      });
    }
    const currentUser = { user_id: insertUserResponse.user_id };
    // insert_book_user(currentUser);

    // console.log("A row inserted into user Table!");
    res.send(insertUserResponse.message);
  } catch (err) {
    console.log("errrors: ", err);
  }
});

rout.post("/book", async (req, res) => {
  data = req.body;
  let connection;

  try {
    // connection = await connectAsync();
    // await connection.beginTransaction();
    queryAsync("START TRANSACTION");

    const insertUserResponse = await bookModel(data);
    if (!insertUserResponse && !insertUserResponse.success) {
      res.send({
        message: "Something went wrong !",
        success: false,
      });
    }
    const currentBookAndUser = {
      book_id: insertUserResponse.book_id,
      user_id: data.user_id,
    };

    // console.log("A row inserted into user Table!");
    res.send("row inserted into the Table user");
    // await connection.commit();
    if (insertUserResponse.book_id != undefined) {
      await insert_book_user(currentBookAndclUser);
      console.log(insertUserResponse.book_id);
      console.log(await queryAsync("COMMIT"));
      res.send(insert_book_user.message);
    } else {
      queryAsync("ROLLBACK");
      console.log("rollbscked");
    }
  } catch (err) {
    // await connection.rollback();
    queryAsync("ROLLBACK");

    console.log("errrors: ", err);
  } finally {
    // Close the database connection
  }
});

module.exports = rout;
