import express from 'express';
import validate from '../middleware/validate.js';

import createOrder from "../controllers/createOrder.js";

import getOrders from '../controllers/getOrders.js';
import getOrdersQueryDto from '../dtos/request/getOrdersQueryDto.js';

const router = express.Router();

// Route to get all orders with optional query validation
router.get('/', validate(null, null, getOrdersQueryDto), getOrders);

// Route to create a new order
router.post('/', createOrder);

export default router;