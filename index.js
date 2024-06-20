import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import booksRoutes from './scr/modules/books/books.routes.js'
import authorsRoutes from './scr/modules/authors/authors.routes.js'
import cors from 'cors'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
app.use('/books',booksRoutes)
app.use('/authors',authorsRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))