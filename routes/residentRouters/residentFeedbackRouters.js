const express = require('express')
const waterFeedbackRouter = require("./waterFeedbackRoutes");
const transportFeedbackRouter = require("./transportFeedbackRoutes");

const residentRouters = express.Router()

residentRouters.use("/waterFeedback", waterFeedbackRouter);
residentRouters.use("/transportFeedback", transportFeedbackRouter);

// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)
// .use('/', FeedbackRouter)

module.exports = residentRouters;
