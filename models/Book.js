import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        index: true,
        match: /^\d{13}$/,
        required: true
    },
    title: {
        type: String,
        index: true,
        required: true
    },
    author: {
        type: String,
        index: true,
        required: true
    },
    genre: {
        type: String,
        index: true,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        min: 0,
        index: true,
        required: true
    },
    coverImage: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;