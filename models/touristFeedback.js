const mongoose = require("mongoose");

const subFields = new mongoose.Schema({
	_id: false,
	rating: {
		type: Number,
		min: 1,
		max: 5,
		default: null,
	},
	reasons: [],
});

const touristFeedback = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		cleanliness: {
			type: subFields,
			default: null,
		},
		accessToTp: {
			type: subFields,
			default: null,
		},
		costEffectiveTp: {
			type: subFields,
			default: null,
		},
		stay: {
			type: subFields,
			default: null,
		},
		hygiene: {
			type: subFields,
			default: null,
		},
		disabilityFriendly: {
			type: subFields,
			default: null,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		versionKey: false,
	}
);

const userFeedbackModel = new mongoose.model("touristFeedback", touristFeedback);

module.exports = userFeedbackModel;
