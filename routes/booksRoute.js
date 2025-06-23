import express from 'express';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import upload from '../middleware/upload.js';
import validate from '../middleware/validate.js';

import getBooks from '../controllers/getBooks.js';
import getBooksQueryDto from '../dtos/request/getBooksQueryDto.js'

import getBook from '../controllers/getBook.js';
import getBookParamsDto from '../dtos/request/getBookParamsDto.js';

import createBook from '../controllers/createBook.js';
import createBookDto from '../dtos/request/createBookDto.js';

import getOwnedBooks from '../controllers/getOwnedBooks.js';
import getOwnedBooksQueryDto from '../dtos/request/getOwnedBooksQueryDto.js';

import updateBook from '../controllers/updateBook.js';
import updateBookDto from '../dtos/request/updateBookDto.js';
import updateBookParamsDto from '../dtos/request/updateBookParamsDto.js';

import deleteBook from '../controllers/deleteBook.js';
import deleteBookParamsDto from '../dtos/request/deleteBookParamsDto.js'

const router = express.Router();

// Route to get all books with optional query validation
router.get('/', validate(null, null, getBooksQueryDto), getBooks);

// Route to get books owned by the authenticated seller
router.get('/owned', authenticate, authorize('seller'), validate(null, null, getOwnedBooksQueryDto), getOwnedBooks);

// Route to get a single book by ID with params validation
router.get('/:id', validate(null, getBookParamsDto), getBook);

// Route to create a new book (seller only), with file upload and body validation
router.post('/', authenticate, authorize('seller'), upload, validate(createBookDto), createBook);

// Route to update a book (seller only), with file upload, body and params validation
router.put('/:id', authenticate, authorize('seller'), upload, validate(updateBookDto, updateBookParamsDto), updateBook);

// Route to delete a book (seller only), with params validation
router.delete('/:id', authenticate, authorize('seller'), validate(null, deleteBookParamsDto), deleteBook);

export default router;