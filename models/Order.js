import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    books: [
        {
            isbn: {
                type: String,
                required: true,
                match: /^\d{13}$/
            },
            title: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            genre: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            price: {
                type: Number,
                required: true
            },
            coverImage: {
                type: String
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'failed', 'complete'],
        default: 'pending',
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
        index: true,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;