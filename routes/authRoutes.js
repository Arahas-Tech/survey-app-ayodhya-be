const express = require('express')
const {signup, login, logout, getUserDetailFromToken} = require('../controller/authController')

const authRouter = express.Router()

authRouter.post('/signup', signup);
authRouter.post('/getUserDetailFromToken', getUserDetailFromToken);
authRouter.post('/login', login);
authRouter.get('/logout', logout);


module.exports = authRouter;