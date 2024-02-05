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
		cleanliness: subFields,
		accessToTp: subFields,
		costEffectiveTp: subFields,
		stay: subFields,
		hygiene: subFields,
		disabilityFriendly: subFields,
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
