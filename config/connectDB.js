import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log(err.message);
    }
}

mongoose.connection.on('connected', () => console.log('DB connected'));

export default connectDB;