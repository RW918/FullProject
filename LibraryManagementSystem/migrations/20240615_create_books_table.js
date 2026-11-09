// migrations/20240616_create_books_table.js
exports.up = function (knex) {
  return knex.schema.createTable("books", (table) => {
    // Task: Define books table fields.
    // Write your code here
    table.increments("id").primary()
    table.text("bookName", 128).notNullable()
    table.text("bookAuthor", 128)
    table.integer("bookPages", 128)
    table.integer("bookPrice", 128)
    table.text("bookState", 128)
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("books");
};
