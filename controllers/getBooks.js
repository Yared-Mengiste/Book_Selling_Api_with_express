import Book from '../models/Book.js';
import ResponseDto from '../dtos/response/ResponseDto.js';
import GetBooksResponseDto from '../dtos/response/GetBooksResponseDto.js';
import PaginationResponseDto from '../dtos/response/PaginationResponseDto.js';

// Controller to handle fetching a list of books with filters, sorting, and pagination
const getBooks = async (req, res, next) => {

    // Extract query parameters from validated query
    const { isbn, title, author, genre, minPrice, maxPrice, sortBy, sortOrder, page, limit } = req.validQuery;
    const findQuery = {};
    // Build sort query based on sortBy and sortOrder
    const sortQuery = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    // Calculate number of documents to skip for pagination
    const skip = (page - 1) * limit;

    // Add filters to the query if provided
    if (isbn) findQuery.isbn = { $regex: `^${isbn}` };
    if (title) findQuery.title = { $regex: `${title}`, $options: 'i' };
    if (author) findQuery.author = { $regex: `${author}`, $options: 'i' };
    if (genre) findQuery.genre = genre;
    if (minPrice) findQuery.price = { $gte: minPrice };
    if (maxPrice) findQuery.price = { ...findQuery.price, $lte: maxPrice };

    try {
        // Fetch books from the database with filters, sorting, and pagination
        const books = await Book
            .find(findQuery)
            .select('isbn title author genre price coverImage')
            .sort(sortQuery)
            .skip(skip)
            .limit(limit)
            .lean();

        // Count total books for pagination info
        const totalBooks = await Book.countDocuments(findQuery);
        const totalPages = Math.ceil(totalBooks / limit);

        // Create a response DTO with books and pagination info
        const responseDto = new ResponseDto({
            success: true,
            data: books.map(book => new GetBooksResponseDto(book)),
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

export default getBooks;