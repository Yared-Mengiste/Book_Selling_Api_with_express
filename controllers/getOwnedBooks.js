import Book from '../models/Book.js';
import ResponseDto from '../dtos/response/ResponseDto.js';
import GetOwnedBookResponseDto from '../dtos/response/GetOwnedBooksResponseDto.js';
import PaginationResponseDto from '../dtos/response/PaginationResponseDto.js';

// Controller to handle fetching books owned by the authenticated seller with pagination
const getOwnedBooks = async (req, res, next) => {

    // Extract pagination parameters from validated query
    const { page, limit } = req.validQuery;
    const skip = (page - 1) * limit;

    try {
        // Fetch books owned by the user with pagination
        const books = await Book
            .find({ owner: req.user.id })
            .select('isbn title author genre description price coverImage')
            .skip(skip)
            .limit(limit)
            .lean();

        // Count total owned books for pagination info
        const totalBooks = await Book.countDocuments({ owner: req.user.id });
        const totalPages = Math.ceil(totalBooks / limit);

        // Create a response DTO with books and pagination info
        const responseDto = new ResponseDto({
            success: true,
            data: books.map(book => new GetOwnedBookResponseDto(book)),
            pagination: new PaginationResponseDto({
                currentPage: page,
                totalPages
            })
        });

        // Send the response
        res.status(200).json(responseDto);
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default getOwnedBooks;