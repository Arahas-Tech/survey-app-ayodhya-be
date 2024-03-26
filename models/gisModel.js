const mongoose = require("mongoose")

const gisSurveySchema = new mongoose.Schema({
    surveyorEmail: {
        type: String,
        required: true
    },
    location: {
        type: Point,
        required: true
    },
    image: {
        // type: ,
    }
})