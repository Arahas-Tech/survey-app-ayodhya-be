const touristFeedbackModel = require("../models/touristFeedback");
const { surveyorLoginModel } = require("../models/loginModel");
const handleError = require("../utils/handleError");
const verifyToken = require("../utils/verifyToken");
const { roleCheck } = require("../utils/roleCheck");
const createFormModel = require("../models/createFormModel");
const { default: mongoose } = require("mongoose");


const addEmail = (data, email) => {
	return {...data, surveyorEmail: email}
}

module.exports.touristFeedback = async (req, res) => {
	try {
		if (!req.headers["authorization"]) return handleError(res, 401, "Error: No token found. Please login.");
		const authToken = req.headers["authorization"].split(" ")[1];
		verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, true);
		const surveyor = await surveyorLoginModel.findOne({
			accessToken: authToken,
		});
		if (!surveyor) {
			return handleError(res, 401, "Access Denied");
		}
		if (!(await roleCheck(res, surveyor, "survey_tourist"))) return res.send("Access Denied");

		const data = addEmail(req.body, surveyor.email);
		// await touristFeedbackModel.create({
		// 	surveyorEmail: surveyor.email,
		// 	touristName: fields.name,
		// 	touristCity: fields.city,
		// 	touristPhone: fields.phone,
		// 	cleanliness: fields.cleanliness,
		// 	accessToTp: fields.accessToTp,
		// 	costEffectiveTp: fields.costEffectiveTp,
		// 	stay: fields.stay,
		// 	hygiene: fields.hygiene,
		// 	disabilityFriendly: fields.disabilityFriendly,
		// });
		
		console.log(Object.keys(mongoose.models));
		const model = await createFormModel('Tourist Survey')
		const temp = await model.create(
			data
		);
		await surveyorLoginModel.findOneAndUpdate({ _id: surveyor._id }, { $inc: { touristSurveys: 1 } });
		res.send("Survey Completed");
	} catch (error) {
		return handleError(res, 400, error);
	}
};
