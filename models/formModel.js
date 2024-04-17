const mongoose = require("mongoose");

const fieldschema = new mongoose.Schema({
	_id: false,
	fieldName: {
		type: String,
		required: true,
	},
	fieldType: {
		type: String,
		required: true,
	},
	isRequired: {
		type: Boolean,
		required: true,
	},
	fieldLabel: {
		type: String,
		required: true,
	},
	fieldPlaceholder: {
		type: String,
		required: true,
	},
	// isActive: {
	// 	type: Boolean,
	// 	required: true,
	// 	default: true,
	// },
});

const form = new mongoose.Schema(
	{
		formName: {
			type: String,
			required: true,
			unique:	true
		},
		city: {
			type: String,
			required: true,
		},
		subject: {
			type: String,
			required: true,
		},
		formFields: [fieldschema],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const formModel = new mongoose.model("forms", form);

module.exports = formModel;
