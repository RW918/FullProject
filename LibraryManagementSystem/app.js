// app.js
const express = require("express");
const knex = require("knex")(require("./knexfile").development);
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", async function (req, res) {
  // Task: We have an array of books with different properties. Let’s send the array to our web page.
  // Your code here

  try {
    // You need to use Knex to connect to PostgreSQL for querying
    /*
        const books = [{
          bookName: "Rudest Book Ever",
          bookAuthor: "Shwetabh Gangwar",
          bookPages: 200,
          bookPrice: 240,
          bookState: "Available"
        },
        {
          bookName: "Do Epic Shit",
          bookAuthor: "Ankur Wariko",
          bookPages: 200,
          bookPrice: 240,
          bookState: "Available"
        }
        ]
    */

    const books = await knex("books").select();
    res.render("home", {
      data: books,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.post("/add", (req, res) => {
  // Task:We have to create a form and handle the form data inside our ‘app.js’ file using Body Parser.
  // Your code here
  const books = req.params.books;
  return knex("books").insert({
    bookName: req.body.bookName,
    bookAuthor: req.body.bookAuthor,
    bookPages: req.body.bookPages,
    bookPrice: req.body.bookPrice,
    bookState: "Available",

  }).then(() => {
    res.redirect("/");
  }).catch((error) => {
    console.log(error);
    res.status(500).json({ error: "Failed to add book" })
  })

});

app.post("/issue", (req, res) => {
  // Task: We have to create an issue route where we are going to fetch the requested book’s name and search for the element which has the same book name, and change the element state property to Issued.
  // Your code here
  return knex("books")
    .where({ bookName: req.body.bookName, bookState: "Available" })
    .update({ bookState: "Issued" })
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to issue book" })
    })
});

app.post("/return", (req, res) => {
  // Task: we have to create a return route where we are going to fetch the requested book’s name and search for the element which has the same book name, and change the element state property to Available.
  // Your code here
  return knex("books")
    .where({ bookName: req.body.bookName, bookState: "Issued" })
    .update({ bookState: "Available" })
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to return book" })
    })
});

app.post("/delete", (req, res) => {
  // Task: We have to create a delete route where we are going to fetch the requested book’s name and search for the element which has the same book name, and delete the element.
  // Your code here
  const bookName = req.params.bookName
  return knex("books").where({
    bookName: req.body.bookName
  }).del().then(() => {
    res.redirect("/")
  }).catch((error) => {
    console.log(error);
    res.status(500).json({ error: "Failed to delete book" })
  })

});

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});
