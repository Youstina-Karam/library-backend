import express from 'express'
import { addBook, deleteBook, getAllBooks, getBookById, updateBook } from './books.controller.js';


const booksRoutes = express.Router()

booksRoutes.route('/').post(addBook).get(getAllBooks)
booksRoutes.route('/:id').get(getBookById).patch(updateBook).delete(deleteBook)


export default booksRoutes;