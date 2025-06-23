import fs from "fs/promises";
import Book from "../models/Book.js";
import ResponseDto from "../dtos/response/ResponseDto.js"
import AppError from "../utils/AppError.js";

// Controller to handle updating a book
const updateBook = async (req, res, next) => {
    // Get the uploaded cover image path, if any, and normalize slashes
    const coverImage = req.file ? req.file.path.replace(/\\/g, '/') : '';

    try {
        // Find and update the book by ID and owner, set new values
        const book = await Book.findOneAndUpdate(
            { _id: req.validParams.id, owner: req.user.id },
            { $set: { ...req.validBody, coverImage } },
            { runValidators: true }
        ).lean();

        if (book) {
            // If the book had a previous cover image, delete the old image file
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

export default updateBook;