const express = require('express')
const { getTransportFeedback, updateTransportFeedback } = require('../../controller/residentFeedbackControllers/transportFeedbackController')

const transportFeedbackRouter = express.Router()

transportFeedbackRouter.post("/getTransportFeedback", getTransportFeedback);
transportFeedbackRouter.post('/updateTransportFeedback', updateTransportFeedback);

module.exports = transportFeedbackRouter;