const express = require('express')
const {signup, login, logout, getUserDetailFromToken, surveyorSignup, surveyorLogin} = require('../controller/authController')

const authRouter = express.Router()

authRouter.post('/signup', signup);
authRouter.post('/surveyorSignup', surveyorSignup);
authRouter.post('/getUserDetailFromToken', getUserDetailFromToken);
authRouter.post('/login', login);
authRouter.post('/surveyorLogin', surveyorLogin);
authRouter.get('/logout', logout);


module.exports = authRouter;