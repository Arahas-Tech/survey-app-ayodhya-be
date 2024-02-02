const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const survey = new mongoose.Schema({
	_id: false,
	touristFeedback: {
		type: Boolean,
	},
	transport: {
		type: Boolean,
	},
	sanitization: {
		type: Boolean,
	},
	water: {
		type: Boolean,
	},
	electricity: {
		type: Boolean,
	},
	education: {
		type: Boolean,
	},
	health: {
		type: Boolean,
	},
	food: {
		type: Boolean,
	},
	employment: {
		type: Boolean,
	},
	greenCover: {
		type: Boolean,
	},
	openSpacesPublicSpaces: {
		type: Boolean,
	},
	vedic: {
		type: Boolean,
	},
	industry: {
		type: Boolean,
	},
	roadInfrastructure: {
		type: Boolean,
	},
	greenEnergy: {
		type: Boolean,
	},
	constructionPractice: {
		type: Boolean,
	},
	informationAccess: {
		type: Boolean,
	},
	crimesInstances: {
		type: Boolean,
	},
	weather: {
		type: Boolean,
	},
});

const userLogin = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		userType: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [6, "Password should be atleast 6 characters."],
		},
		phone: {
			type: String,
			unique: true,
			match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		accessToken: {
			type: String,
		},
		refreshToken: {
			type: String,
		},
		surveys: {
			type: survey
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

userLogin.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const users = new mongoose.model("users", userLogin);

module.exports = users;