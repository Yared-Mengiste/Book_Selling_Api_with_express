import fs from "fs/promises";
import User from "../models/User.js";
import Book from "../models/Book.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js"
import AppError from "../utils/AppError.js";
import ResponseDto from "../dtos/response/ResponseDto.js";

// Controller to handle deleting the currently authenticated user
const deleteCurrentUser = async (req, res, next) => {
    try {
        // Find and delete the user by their ID
        const deletedUser = await User.findOneAndDelete({ _id: req.user.id }).lean();

        // If user not found, return a 404 error
        if (!deletedUser)
            next(new AppError('user not found', 404));

        // If the user is a seller, delete all their books and cover images
        if (deletedUser.role === 'seller') {
            const booksToDelete = await Book.find({ owner: deletedUser._id }).lean();

            if (booksToDelete)
                await Book.deleteMany({ owner: deletedUser._id });

            // Delete each book's cover image from the filesystem
            booksToDelete.forEach(async (book) => {
                if (book.coverImage) await fs.unlink(book.coverImage);
            });
        }
        // If the user is a buyer, delete their cart and orders
        else {
            await Cart.deleteOne({ user: deletedUser._id });
            await Order.deleteMany({ user: deletedUser._id });
        }

        // Send a success response
        const responseDto = new ResponseDto({ success: true, message: 'user deleted' });
        res.status(200).json(responseDto);
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default deleteCurrentUser;