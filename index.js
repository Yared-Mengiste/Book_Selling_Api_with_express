import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import connectDB from './config/connectDB.js';
import authenticate from './middleware/authenticate.js';
import authorize from './middleware/authorize.js';
import authRoute from './routes/authRoute.js';
import usersRoute from './routes/usersRoute.js';
import booksRoute from './routes/booksRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';
import errorHandler from './middleware/errorHandler.js';
import AppError from './utils/AppError.js';

connectDB();

const app = express();
const swaggerDocument = YAML.load('./docs/openapi.yaml');

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/books', booksRoute);
app.use('/api/cart', authenticate, authorize('buyer'), cartRoute);
app.use('/api/users', authenticate, usersRoute);
app.use('/api/orders', authenticate, authorize('buyer'), orderRoute);
app.use('/api/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.all('*splat', (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} was not found!`, 404));
})
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});