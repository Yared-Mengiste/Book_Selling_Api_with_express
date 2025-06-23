import express from 'express';
import validate from '../middleware/validate.js';

import login from '../controllers/login.js';
import loginDto from '../dtos/request/loginDto.js';

import createUser from '../controllers/createUser.js';
import createUserDto from '../dtos/request/createUserDto.js';

const router = express.Router();

// Route for user login with validation middleware
router.post('/login', validate(loginDto), login);

// Route for user registration with validation middleware
router.post('/register', validate(createUserDto), createUser);

export default router;