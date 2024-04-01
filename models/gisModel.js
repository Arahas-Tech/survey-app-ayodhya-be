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
	mohalla: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	pincode: {
		type: Number,
		required: true,
	},
},{
	versionKey: false
});

const gisModel = new mongoose.model("gisSurvey", gisSurveySchema);

module.exports = gisModel;
