import mongoose from "mongoose";
import Book from "../models/Book.js"
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import ResponseDto from "../dtos/response/ResponseDto.js";
import AppError from "../utils/AppError.js";

// Controller to handle creating a new order from the user's cart
const createOrder = async (req, res, next) => {

    // Start a MongoDB session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: req.user.id }).lean();

        // If cart is empty or not found, throw an error
        if (!cart || cart.books.length === 0)
            throw new AppError('there are no items in cart', 404);

        const orderBooks = [];

        // For each book in the cart, remove it from the books collection and prepare order details
        for (const bookId of cart.books) {
            const book = await Book
                .findByIdAndDelete(bookId)
                .select('-_id isbn title author genre description price coverImage owner')
                .lean()
                .session(session);

            if (book) {
                // Extract book details and add to orderBooks array
                const { isbn, title, author, genre, description, price, coverImage, owner: seller } = book;
                orderBooks.push({ isbn, title, author, genre, description, price, coverImage, seller });
            }
            else throw new AppError('book not found', 404);
        }

        // Create a new order with the books and set status to 'complete'
        const order = new Order({ user: req.user.id, books: orderBooks, status: 'complete' });
        await order.save({ session });

        // Delete the user's cart after order is placed
        await Cart.deleteMany({ user: req.user.id }).session(session)

        // Commit the transaction and end the session
        await session.commitTransaction();
        session.endSession();

        // Send a success response
        const responseDto = new ResponseDto({ success: true });
        return res.status(200).json(responseDto);

    } catch (err) {
        // Abort the transaction and end the session on error
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}

export default createOrder;