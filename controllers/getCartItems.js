import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import ResponseDto from '../dtos/response/ResponseDto.js';
import GetCartItemsResponseDto from '../dtos/response/GetCartItemsResponseDto.js';

// Controller to handle fetching all items in the user's cart
const getCartItems = async (req, res, next) => {
    try {
        // Aggregate cart items for the authenticated user
        const cart = await Cart
            .aggregate()
            .match({ user: new mongoose.Types.ObjectId(req.user.id) })
            .project('books')
            .unwind('$books')
            .lookup({
                from: 'books',
                let: { bookId: '$books' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$bookId'] } } },
                    { $project: { isbn: 1, title: 1, author: 1, genre: 1, price: 1, coverImage: 1 } },
                ],
                as: 'books'
            })
            .unwind('$books')
            .group({ _id: '$_id', books: { $push: '$books' } })
            .project('books -_id')

        // Extract books array from aggregation result
        const books = cart.length ? cart[0].books : [];
        // Create a response DTO with cart items
        const responseDto = new ResponseDto({
            success: true,
            data: books.map(book => new GetCartItemsResponseDto(book))
        });

        // Send the response
        res.status(200).json(responseDto);
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default getCartItems;