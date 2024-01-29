const express = require('express')
const {signin, login, logout, getUserDetailFromToken} = require('../controller/authController')

const authRouter = express.Router()

authRouter.post('/signin', signin);
authRouter.post('/getUserDetailFromToken', getUserDetailFromToken);
authRouter.post('/login', login);
authRouter.get('/logout', logout);


module.exports = authRouter;