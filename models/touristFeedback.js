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
		surveyorEmail: {
			type: String,
			required: true,
		},
		touristEmail: {
			type: String,
			default: "Anonymous",
		},
		touristPhone: {
			type: String,
			match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
			default: null,
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
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const feedbackModel = new mongoose.model("touristFeedback", touristFeedback);

module.exports = feedbackModel;
