const { queryAsync, connectAsync } = require("../Modules/connection");

const bookModel = async (data) => {
  try {
    const response = await queryAsync(`
    INSERT INTO book (b_name, genre, author, edition, publish_date, isbn, language, description, page_count, material_type, cover)
    VALUES ("${data.b_name}", "${data.genre}", "${data.author}", "${data.edition}", "${data.publish_date}", "${data.isbn}", "${data.language}", "${data.description}", "${data.page_count}", "${data.material_type}", "${data.cover}");
    
    `);

    // console.log(response.insertId);
    return {
      message: "Data inserted successfully",
      success: true,
      book_id: response.insertId,
    };
  } catch (err) {
    console.log({ err });
    return {
      message: "something went wrong during insertion to Table book!",
      success: false,
    };
  }
};

module.exports = { bookModel };
