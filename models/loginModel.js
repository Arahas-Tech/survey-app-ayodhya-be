const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const survey = new mongoose.Schema({
	_id: false,
	constructionPractice: {
		type: Boolean,
		default: false
	},
	crimesInstances: {
		type: Boolean,
		default: false
	},
	education: {
		type: Boolean,
		default: false
	},
	electricity: {
		type: Boolean,
		default: false
	},
	employment: {
		type: Boolean,
		default: false
	},
	food: {
		type: Boolean,
		default: false
	},
	greenCover: {
		type: Boolean,
		default: false
	},
	greenEnergy: {
		type: Boolean,
		default: false
	},
	health: {
		type: Boolean,
		default: false
	},
	industry: {
		type: Boolean,
		default: false
	},
	informationAccess: {
		type: Boolean,
		default: false
	},
	openSpacesPublicSpaces: {
		type: Boolean,
		default: false
	},
	roadInfrastructure: {
		type: Boolean,
		default: false
	},
	sanitization: {
		type: Boolean,
		default: false
	},
	transport: {
		type: Boolean,
		default: false
	},
	vedic: {
		type: Boolean,
		default: false
	},
	water: {
		type: Boolean,
		default: false
	},
	weather: {
		type: Boolean,
		default: false
	},
});

const userLogin = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
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


const surveyorLogin = new mongoose.Schema(
	{
		email: {
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
			match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		surveysConducted: {
			type: Number,
			default: 0 
		},
		accessToken: {
			type: String,
		},
		refreshToken: {
			type: String,
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

surveyorLogin.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const loginModel = new mongoose.model("users", userLogin);
const surveyorLoginModel = new mongoose.model("surveyors", surveyorLogin);

module.exports.loginModel = loginModel;
module.exports.surveyorLoginModel = surveyorLoginModel;
