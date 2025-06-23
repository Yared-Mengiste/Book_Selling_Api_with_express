import fs from 'fs/promises';
import Book from '../models/Book.js';
import ResponseDto from '../dtos/response/ResponseDto.js';
import AppError from '../utils/AppError.js';

// Controller to handle deleting a book
const deleteBook = async (req, res, next) => {
    try {
        // Find and delete the book by ID and owner
        const book = await Book.findOneAndDelete({ _id: req.validParams.id, owner: req.user.id }).lean();

        if (book) {
            // If the book has a cover image, delete the image file from the filesystem
            if (book.coverImage) await fs.unlink(book.coverImage);
            // Send a success response
            const responseDto = new ResponseDto({ success: true });
            return res.status(200).json(responseDto);
        }

        // If the book was not found, return a 404 error
        next(new AppError('book not found', 404));
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default deleteBook;