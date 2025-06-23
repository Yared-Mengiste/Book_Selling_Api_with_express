import express from 'express';
import validate from '../middleware/validate.js';

import getUsers from '../controllers/getUsers.js';

import getCurrentUser from '../controllers/getCurrentUser.js';

import getUser from '../controllers/getUser.js';
import getUserParmasDto from '../dtos/request/getUserParamsDto.js';

import updateCurrentUser from '../controllers/updateCurrentUser.js';
import updateUserDto from '../dtos/request/updateUserDto.js';

import deleteCurrentUser from '../controllers/deleteCurrentUser.js';

const router = express.Router();

// Route to get all users
router.get('/', getUsers);

// Route to get the currently authenticated user
router.get('/me', getCurrentUser);

// Route to get a user by ID with params validation
router.get('/:id', validate(null, getUserParmasDto), getUser);

// Route to update the currently authenticated user with body validation
router.put('/me', validate(updateUserDto), updateCurrentUser);

// Route to delete the currently authenticated user
router.delete('/me', deleteCurrentUser);

export default router;