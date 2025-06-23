import express from 'express';
import validate from '../middleware/validate.js'

import getCartItems from '../controllers/getCartItems.js';

import createCartItem from '../controllers/createCartItem.js';
import createCartItemDto from '../dtos/request/createCartItemDto.js';

import deleteCartItem from '../controllers/deleteCartItem.js';
import deleteCartItemParamsDto from '../dtos/request/deleteCartItemParamsDto.js';

const router = express.Router();

// Route to get all items in the cart
router.get('/', getCartItems);

// Route to add a new item to the cart with body validation
router.post('/', validate(createCartItemDto), createCartItem);

// Route to delete an item from the cart by bookId with params validation
router.delete('/:bookId', validate(null, deleteCartItemParamsDto), deleteCartItem);

export default router;