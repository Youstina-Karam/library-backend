import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  birthDate: {
    type: Date
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

const Author = model('Author', authorSchema);

export default Author;