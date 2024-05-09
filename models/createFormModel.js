const handleError = require("../utils/handleError");
const formModel = require("./formModel");
const mongoose = require("mongoose");

const mapFieldType = (typeString) => {
	switch (typeString) {
		case "string":
			return String;
		case "number":
			return Number;
		case "date":
			return Date;
		case "boolean":
			return Boolean;
		case "buffer":
			return Buffer;
		case "mixed":
			return mongoose.Schema.Types.Mixed;
		case "objectId":
			return mongoose.Schema.Types.ObjectId;
		case "array":
			return [String];
		case "map":
			return Map;
		default:
			throw new Error("Unsupported field type: " + typeString);
	}
};

const fieldMapping = (fields) => {
	const data = fields.map((field, idx) => ({
			[field.fieldName]: {
				type: mapFieldType(field.fieldType),
				required: field.isRequired,
			}
	}));
	const schemaFields = Object.assign([], ...data);
	return schemaFields;
};

const createFormModel = async (formName) => {
	try {
		if (mongoose.models['Tourist Survey']) return mongoose.models['Tourist Survey']
		
		const form = await formModel.findOne({
			formName,
		});

		const schemaFields = fieldMapping(form.formFields);
		const schema = new mongoose.Schema(
			{
				surveyorEmail: {
					type: String,
					required: true,
				},
				// touristCity: {
				// 	type: String,
				// 	required: true,
				// },
				// subject: {
				// 	type: String,
				// 	required: true,
				// },
				touristName: {
					type: String,
					required: true,
				},
				touristContact: {
					type: String,
					required: true,
				},
				touristCity: {
					type: String,
					required: true,
				},
				...schemaFields,
			},
			{
				timestamps: true,
				versionKey: false,
			}
		);
		const model = new mongoose.model(formName, schema);
		return model;
	} catch (error) {
		console.log(error);
	}
};

module.exports = createFormModel;
