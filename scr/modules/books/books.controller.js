import Book from "../../../database/models/books.model.js";

//POST request to create a new book
export const addBook = async (req, res) => {
  await Book.insertMany(req.body);
  res.status(201).send({ message: "added new book" });
};

//GET request to retrieve all books.
export const getAllBooks = async (req, res) => {
  const { page = 1, limit = 10 , title, author } = req.query;
  let query = {};
  if (title) {
    query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
  }
  if (author) {
    query.author = { $regex: author, $options: 'i' }; // Case-insensitive search
  }
  let books = await Book.find(query)
    .select("-__v")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const count = await Book.countDocuments(query);
  res
    .status(200)
    .send({ books, totalPages: Math.ceil(count / limit), currentPage: page });
};

//GET request to retrieve a single book by its ID.
export const getBookById = async (req, res) => {
  let book = await Book.findById(req.params.id).select("-__v");
  if (!book) {
    return res.status(404).send({ message: "Book not found" });
  }
  res.status(200).send(book);
};

//PATCH request to update a book by its ID.
export const updateBook = async (req, res) => {
  let book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-__v");
  if (!book) {
    return res.status(404).send({ message: "Book not found" });
  }
  res.status(200).send({ message: "updated book ", book });
};

//DELETE request to delete a book by its ID.
export const deleteBook = async (req, res) => {
  let book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).send({ message: "Book not found" });
  }
  res.status(200).send({ message: "deleted book" });
};
