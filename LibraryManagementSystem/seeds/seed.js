exports.seed = function (knex) {
    return knex("books").insert([
        { bookName: "Rudest Book Ever", bookAuthor: "Shwetabh Gangwar", bookPages: 200, bookPrice: 240, bookState: "Available" },
        { bookName: "Do Epic Shit", bookAuthor: "Ankur Wariko", bookPages: 200, bookPrice: 240, bookState: "Available" },
    ]);
};