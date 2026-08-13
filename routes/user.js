const express = require('express');

const userRouter = express.Router();
const {createUser,loginUser} = require('../controllers/user');

userRouter.post('/create',createUser);
userRouter.post('/login',loginUser);

module.exports = userRouter;
