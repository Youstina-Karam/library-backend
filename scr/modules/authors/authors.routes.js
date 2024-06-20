import express from 'express'
import { addAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from './authors.controller.js';


const authorsRoutes = express.Router()

authorsRoutes.route('/').post(addAuthor).get(getAllAuthors)
authorsRoutes.route('/:id').get(getAuthorById).patch(updateAuthor).delete(deleteAuthor)


export default authorsRoutes;