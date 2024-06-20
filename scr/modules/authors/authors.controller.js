import Author from "../../../database/models/author.model.js";

//POST request to create a new author
export const addAuthor = async (req, res) => {
  await Author.insertMany(req.body);
  res.status(201).send({ message: "added new author" });
};

//GET request to retrieve all authors.
export const getAllAuthors = async (req, res) => {
  const { page = 1, limit = 10, name, bio } = req.query;
  let query = {};
  if (name) {
    query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
  }
  if (bio) {
    query.bio = { $regex: bio, $options: 'i' }; // Case-insensitive search
  }
  let authors = await Author.find(query)
    .populate("books", "-__v")
    .select("-__v")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Author.countDocuments(query);

  res
    .status(200)
    .send({ authors, totalPages: Math.ceil(count / limit), currentPage: page });
};

//GET request to retrieve a single author by its ID.
export const getAuthorById = async (req, res) => {
  let author = await Author.findById(req.params.id)
    .populate("books", "-__v")
    .select("-__v");
  if (!author) {
    return res.status(404).send({ message: "Author not found" });
  }
  res.status(200).send(author);
};

//PATCH request to update a author by its ID.
export const updateAuthor = async (req, res) => {
  let author = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-__v");
  if (!author) {
    return res.status(404).send({ message: "Author not found" });
  }
  res.status(200).send({ message: "updated author ", author });
};

//DELETE request to delete a Aauthor by its ID.
export const deleteAuthor = async (req, res) => {
  let author = await Author.findByIdAndDelete(req.params.id);
  if (!author) {
    return res.status(404).send({ message: "Author not found" });
  }
  res.status(200).send({ message: "deleted author" });
};
