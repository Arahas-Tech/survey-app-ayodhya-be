const express = require('express')
const {signup, login, logout, getDetailsFromToken, surveyorSignup, surveyorLogin} = require('../controller/authController');

const authRouter = express.Router()

authRouter.post('/signup', signup);
authRouter.post('/surveyorSignup', surveyorSignup);
authRouter.post('/getDetailsFromToken', getDetailsFromToken);
authRouter.post('/login', login);
authRouter.post('/surveyorLogin', surveyorLogin);
authRouter.get('/logout', logout);

module.exports = authRouter;