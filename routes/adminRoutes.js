const express = require('express')
const { surveyOverview, updateSurveyor, createForm, updateForm } = require('../controller/adminController');
const { surveyors } = require('../controller/adminController');

const adminRouter = express.Router()

adminRouter.get('/overview', surveyOverview);
adminRouter.get('/surveyors', surveyors);
adminRouter.post('/update_surveyor', updateSurveyor);
adminRouter.post('/create_form', createForm);
adminRouter.post('/update_form', updateForm);


module.exports = adminRouter;