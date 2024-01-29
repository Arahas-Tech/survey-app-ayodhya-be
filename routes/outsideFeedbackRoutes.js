const express = require('express')
const {touristFeedback} = require('../controller/touristFeedbackController') 

const feedbackRouter = express.Router()

feedbackRouter.post("/touristFeedback", touristFeedback);

module.exports = feedbackRouter;