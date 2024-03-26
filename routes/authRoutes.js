const express = require('express')
const {signup, login, logout, getDetailsFromToken, surveyorSignup, surveyorLogin} = require('../controller/authController');
const { surveyOverview, updateSurveyor } = require('../controller/dataDisplayController');
const { surveyors } = require('../controller/dataDisplayController');

const authRouter = express.Router()

authRouter.post('/signup', signup);
authRouter.post('/surveyorSignup', surveyorSignup);
authRouter.post('/getDetailsFromToken', getDetailsFromToken);
authRouter.post('/login', login);
authRouter.post('/surveyorLogin', surveyorLogin);
authRouter.get('/logout', logout);

// authRouter.get('/overview', surveyOverview);
// authRouter.get('/surveyors', surveyors);
// authRouter.post('/update_surveyor', updateSurveyor);


module.exports = authRouter;