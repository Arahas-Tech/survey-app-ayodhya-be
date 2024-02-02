const mongoose = require("mongoose");

const touristFeedback = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		cleanliness: {
			type: Number,
			min: 1,
			max: 5,
            required: true,
		},
		accessToTp: {
			type: Number,
			min: 1,
			max: 5,
            required: true,
		},
		costEffectiveTp: {
			type: Number,
			min: 1,
			max: 5,
            required: true,
		},
		lodging: {
			type: Number,
			min: 1,
			max: 5,
            required: true,
		},
		hygiene: {
			type: Number,
			min: 1,
			max: 5,
            required: true,
		},
		disabilityFriendly: {
			type: Number,
			min: 1,
			max: 5,
            required: true,
		},
		// totalScore: {
		// 	type: Number,
		// 	min: 1,
		// 	max: 5,
		// },
	},
	{
		versionKey: false,
	}
);

const userFeedbackModel = new mongoose.model('touristFeedback', touristFeedback)

module.exports = userFeedbackModel ;
