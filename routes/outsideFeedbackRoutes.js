const express = require('express')
const {touristFeedback} = require('../controller/touristFeedbackController'); 
const { gisSurvey } = require('../controller/gisSurveyController');

const survey = express.Router()

survey.post("/touristFeedback", touristFeedback);
survey.post("/gisSurvey", gisSurvey);

module.exports = survey;