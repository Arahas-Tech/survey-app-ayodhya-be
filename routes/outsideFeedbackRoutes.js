const express = require('express')
const {touristFeedback} = require('../controller/touristFeedbackController'); 
const { gisSurvey, formFeedback } = require('../controller/gisSurveyController');

const survey = express.Router()

survey.post("/touristFeedback", touristFeedback);
survey.post("/gisSurvey", gisSurvey);
// survey.post("/testForm", formFeedback);

module.exports = survey;