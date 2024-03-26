const express = require('express')
const { surveyOverview, updateSurveyor } = require('../controller/dataDisplayController');
const { surveyors } = require('../controller/dataDisplayController');

const adminRouter = express.Router()

adminRouter.get('/overview', surveyOverview);
adminRouter.get('/surveyors', surveyors);
adminRouter.post('/update_surveyor', updateSurveyor);


module.exports = adminRouter;