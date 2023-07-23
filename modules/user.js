const { queryAsync, connectAsync } = require("../Modules/connection");

const userModel = async (data) => {
  try {
    const response = await queryAsync(`
    
        INSERT INTO user (first_name, last_name, dob, mob, yob, phone_no, e_mail, password, occupation, organisation, country, state_or_city, street, flat_no, zipcode, p_picture, created_at, updated_at, user_type)
        VALUES ("${data.first_name}", "${data.last_name}", "${data.dob}", "${data.mob}", "${data.yob}", "${data.phone_no}", "${data.Email}", "${data.password}",
        "${data.occupation}", "${data.organisation}", "${data.country}", "${data.state_or_city}", "${data.street}","${data.flat_no}", "${data.zip_code}", "${data.p_picture}", "${data.created_at}", "${data.updated_at}", "${data.user_type}");
        `);

    // console.log(response.insertId);
    return {
      message: "Data IInserted to the table user successfully!",
      success: true,
      user_id: response.insertId,
    };
  } catch (err) {
    return {
      message: "something went wrong",
      success: false,
    };
  }
};

const insert_book_user = (data) => {
  try {
    if (data.user_id && data.book_id) {
      queryAsync(`
        INSERT INTO book_user(user_id,book_id) values("${data.user_id}", "${data.book_id}");
     `);
    }
    //     if (data.user_id && data.book_id) {
    //       queryAsync(`
    //         UPDATE book_user
    // SET book_id = ${data.book_id}
    // WHERE user_id = ${data.user_id};

    //           `);
    //     }

    return {
      message: "Data inserted sucessfully to the tbles user and book_user!",
      success: true,
    };
  } catch {
    return {
      message: "something went wrong",
      success: false,
    };
  }
};

module.exports = { userModel, insert_book_user };
