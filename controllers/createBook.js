import Book from "../models/Book.js";
import AppError from "../utils/AppError.js";
import ResponseDto from "../dtos/response/ResponseDto.js";

// Controller to handle creating a new book
const createBook = async (req, res, next) => {

    // Get the uploaded cover image path, if any, and normalize slashes
    const coverImage = req.file ? req.file.path.replace(/\\/g, '/') : '';

    try {
        // Create a new book with validated body, cover image, and owner ID
        const book = await Book.create({ ...req.validBody, coverImage, owner: req.user.id });

        if (book) {
            // If book creation is successful, send a success response
            const responseDto = new ResponseDto({ success: true });
            return res.status(200).json(responseDto);
        }

        // If book creation fails, pass a bad request error to the error handler
        next(new AppError('bad request', 400));
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default createBook;