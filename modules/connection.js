const mysql = require("mysql2");
const util = require("util");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "farzam",
});

const dbName = "obss";
const tables = [
  {
    name: "book",
    definition:
      "CREATE TABLE `book` (\n" +
      "  `id` INT(10) NOT NULL AUTO_INCREMENT UNIQUE,\n" +
      "  `b_name` varchar(255) NOT NULL UNIQUE,\n" +
      "  `genre` VARCHAR(255) NOT NULL,\n" +
      "  `author` varchar(255) NOT NULL,\n" +
      "  `edition` VARCHAR(255) NOT NULL,\n" +
      "  `publish_date` DATE NOT NULL,\n" +
      "  `isbn` VARCHAR(255) NOT NULL,\n" +
      "  `language` VARCHAR(255) NOT NULL,\n" +
      "  `description` TEXT NOT NULL,\n" +
      "  `page_count` INT NOT NULL,\n" +
      "  `material_type` INT NOT NULL,\n" +
      "  `cover` VARCHAR(255) NOT NULL,\n" +
      "  PRIMARY KEY (`id`)\n" +
      ");",
  },
  {
    name: "user",
    definition:
      "CREATE TABLE `user` (\n" +
      "`id` INT(10) NOT NULL AUTO_INCREMENT,\n" +
      "`first_name` VARCHAR(15) NOT NULL,\n" +
      "`last_name` VARCHAR(255) NOT NULL,\n" +
      "`dob` INT NOT NULL,\n" +
      "`mob` INT NOT NULL,\n" +
      "`yob` INT NOT NULL,\n" +
      "`phone_no` INT NOT NULL,\n" +
      "`e_mail` VARCHAR(255) NOT NULL,\n" +
      "`password` VARCHAR(255) BINARY NOT NULL,\n" +
      "`occupation` VARCHAR(12) NOT NULL,\n" +
      "`organisation` VARCHAR(30),\n" +
      "`country` VARCHAR(15) NOT NULL,\n" +
      "`state_or_city` VARCHAR(20) NOT NULL,\n" +
      "`street` VARCHAR(255) NOT NULL,\n" +
      "`flat_no` INT NOT NULL,\n" +
      "`zipcode` INT NOT NULL,\n" +
      "`p_picture` VARCHAR(255) NOT NULL,\n" +
      "`created_at` TIMESTAMP NOT NULL,\n" +
      "`updated_at` TIMESTAMP NOT NULL,\n" +
      "`user_type` VARCHAR(12) NOT NULL,\n" +
      "PRIMARY KEY (`id`)\n" +
      ");",
  },
  {
    name: "category",
    definition:
      "CREATE TABLE `category` (\n" +
      "`id` INT NOT NULL AUTO_INCREMENT,\n" +
      "`material_type` VARCHAR(255) NOT NULL UNIQUE,\n" +
      "PRIMARY KEY (`id`) \n" +
      ");",
  },
  {
    name: "book_user",
    definition:
      "CREATE TABLE `book_user` (\n" +
      "`book_user_id` INT NOT NULL AUTO_INCREMENT UNIQUE,\n" +
      "`book_id` INT  NULL,\n" +
      "`user_id` INT  NULL,\n" +
      "PRIMARY KEY (`book_user_id`) \n" +
      ");",
  },
  {
    name: "user_type",
    definition:
      "CREATE TABLE `user_type` (\n" +
      "`type_id` INT NOT NULL AUTO_INCREMENT,\n" +
      "`type_name` VARCHAR(15) NOT NULL UNIQUE,\n" +
      "PRIMARY KEY (`type_id`) \n" +
      ");",
  },
];

const connectAsync = util.promisify(con.connect).bind(con);
const queryAsync = util.promisify(con.query).bind(con);

async function main() {
  try {
    await connectAsync();
    console.log("Database connected successfully");

    await createDB();

    await createTable(tables);
  } catch (err) {
    console.log("Error:", err);
  }
  // finally {
  //   con.end();
  // }
}

async function createDB() {
  const databases = await queryAsync("show databases LIKE 'obss';");

  if (databases.length === 0) {
    await queryAsync("CREATE DATABASE obss;");
    await queryAsync("USE obss");
    console.log("Database has been created successfully!");
  } else {
    console.log("Database OBSS already exists!");
    await queryAsync("USE obss");
  }
}

async function createTable(tables) {
  for (const table of tables) {
    const tableName = table.name;
    const tableDef = table.definition;

    const existingTables = await queryAsync(`SHOW TABLES LIKE '${tableName}';`);

    if (existingTables.length === 0) {
      await queryAsync(tableDef);
      console.log(`Table ${tableName} got created successfully!`);
    } else {
      console.log(`Table ${tableName} already exists!`);
    }
  }
}

main();

module.exports = { queryAsync, connectAsync };
