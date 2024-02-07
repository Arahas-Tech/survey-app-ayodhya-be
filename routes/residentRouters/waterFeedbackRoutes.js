const express = require('express')
const { getWaterFeedback, updateWaterFeedback } = require('../../controller/residentFeedbackControllers/waterFeedbackController')

const waterFeedbackRouter = express.Router()

waterFeedbackRouter.post("/getWaterFeedback", getWaterFeedback);
waterFeedbackRouter.post("/updateWaterFeedback", updateWaterFeedback);

module.exports = waterFeedbackRouter;