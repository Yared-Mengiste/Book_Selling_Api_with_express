import Book from "../models/Book.js";
import ResponseDto from "../dtos/response/ResponseDto.js";
import GetBookResponseDto from "../dtos/response/GetBookResponseDto.js";
import AppError from '../utils/AppError.js';

// Controller to handle fetching a single book by ID
const getBook = async (req, res, next) => {
    try {
        // Find the book by ID, select specific fields, and populate owner info
        const book = await Book
            .findById(req.validParams.id)
            .select('isbn title author genre description price coverImage owner')
            .populate({ path: 'owner', select: 'firstName lastName phone' })
            .lean();

        if (book) {
            // If book is found, send a success response with book data
            const responseDto = new ResponseDto({ success: true, data: new GetBookResponseDto(book) });
            return res.status(200).json(responseDto);
        }

        // If book is not found, return a 404 error
        next(new AppError('book not found', 404));
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default getBook;