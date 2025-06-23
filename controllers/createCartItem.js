import Cart from "../models/Cart.js";
import ResponseDto from "../dtos/response/ResponseDto.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";

// Controller to handle adding a new item to the user's cart
const createCartItem = async (req, res, next) => {
    // Extract user ID from authenticated user and book ID from validated body
    const { id: userId } = req.user;
    const { bookId } = req.validBody;

    try {
        // Check if the book is already in the user's cart using aggregation
        const itemExists = await Cart
            .aggregate()
            .match({ user: new mongoose.Types.ObjectId(userId) })
            .project('books -_id')
            .unwind('$books')
            .match({ books: new mongoose.Types.ObjectId(bookId) });

        // If the book is already in the cart, return a 400 error
        if (itemExists.length > 0) {
            return next(new AppError('book already in cart', 400));
        }

        // Add the book to the user's cart, creating the cart if it doesn't exist
        const result = await Cart.updateOne(
            { user: userId },
            { $push: { books: bookId } },
            { upsert: true, runValidators: true }
        );

        // If the cart was updated or created, send a success response
        if (result.upsertedCount || result.modifiedCount) {
            const responseDto = new ResponseDto({ success: true });
            return res.status(200).json(responseDto);
        }

        // If the operation failed, return a bad request error
        next(new AppError('bad request', 400));
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default createCartItem;