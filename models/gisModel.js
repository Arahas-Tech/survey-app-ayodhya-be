const mongoose = require("mongoose");


const locationSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["Point"],
		required: true,
	},
	coordinates: {
		type: [Number],
		required: true,
	},
});

const gisSurveySchema = new mongoose.Schema({
	surveyorEmail: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	location: {
		type: locationSchema,
		required: true,
	},
	region: {
		type: String,
		required: true,
	},
});

const gisModel = new mongoose.model("gisSurvey", gisSurveySchema);

module.exports = gisModel;
