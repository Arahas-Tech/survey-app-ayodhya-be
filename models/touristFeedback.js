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
			max: 10,
            required: true,
		},
		accessToTp: {
			type: Number,
			min: 1,
			max: 10,
            required: true,
		},
		costEffectiveTp: {
			type: Number,
			min: 1,
			max: 10,
            required: true,
		},
		lodging: {
			type: Number,
			min: 1,
			max: 10,
            required: true,
		},
		hygiene: {
			type: Number,
			min: 1,
			max: 10,
            required: true,
		},
		disabilityFriendly: {
			type: Number,
			min: 1,
			max: 10,
            required: true,
		},
		// totalScore: {
		// 	type: Number,
		// 	min: 1,
		// 	max: 10,
		// },
	},
	{
		versionKey: false,
	}
);

// userLogin.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// });

const userFeedbackModel = new mongoose.model('touristFeedback', touristFeedback)

module.exports = userFeedbackModel ;
