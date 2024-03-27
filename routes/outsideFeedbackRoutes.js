const express = require('express')
const {touristFeedback} = require('../controller/touristFeedbackController') 

const survey = express.Router()

survey.post("/touristFeedback", touristFeedback);
survey.post("/gisSurvey", touristFeedback);

module.exports = survey;