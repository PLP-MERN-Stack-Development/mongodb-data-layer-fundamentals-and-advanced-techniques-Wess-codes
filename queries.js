// queries.js

// Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// Find books by a specific author
db.books.find({ author: "George Orwell" });

// Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 15.99 } });

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

// Advanced queries
db.books.find({ in_stock: true, published_year: { $gt: 2010 } }, { title: 1, author: 1, price: 1 });

db.books.find().sort({ price: 1 }); // ascending
db.books.find().sort({ price: -1 }); // descending

db.books.find().skip(5).limit(5); // pagination

// Aggregation pipelines
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

db.books.aggregate([
  { $project: { decade: { $floor: { $divide: ["$published_year", 10] } } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } }
]);

// Indexing
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });
db.books.find({ title: "1984" }).explain("executionStats");
