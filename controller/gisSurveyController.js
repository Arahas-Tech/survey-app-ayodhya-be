const touristFeedbackModel = require("../models/touristFeedback");
const { surveyorLoginModel } = require("../models/loginModel");
const handleError = require("../utils/handleError");
const verifyToken = require("../utils/verifyToken");
const gisModel = require("../models/gisModel");
const { roleCheck } = require("../utils/roleCheck");
const createFormModel = require("../models/createFormModel");

module.exports.gisSurvey = async (req, res) => {
	try {
		if (!req.headers["authorization"]) return handleError(res, 401, "Error: No token found. Please login.");
		const authToken = req.headers["authorization"].split(" ")[1];
		verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, true);
		const fields = req.body;
		const surveyor = await surveyorLoginModel.findOne({
			accessToken: authToken,
		});
		if (!surveyor) {
			return handleError(res, 401, "Access Denied");
		}
		if (!(await roleCheck(res, surveyor, "survey_gis"))) return res.send("Access Denied");
		await gisModel.create({
			surveyorEmail: surveyor.email,
			image: fields.image,
			latitude: fields.latitude,
			longitude: fields.longitude,
			mohalla: fields.mohalla,
			state: fields.state,
			pincode: fields.pincode,
			city: fields.city,
		});
		await surveyorLoginModel.findOneAndUpdate({ _id: surveyor._id }, { $inc: { gisSurveys: 1 } });
		res.send("Survey Completed");
	} catch (error) {
		return handleError(res, 400, error);
	}
};


// module.exports.formFeedback = async (req,res) => {
// 	try {
// 		const data = req.body;
// 		const model = await createFormModel('testForm1');
// 		console.log(data);

// 		await model.create(
// 			data
// 		)
// 		res.send('Survey Completed')
// 	} catch (error) {
// 		return handleError(res, 400, error)
// 	}
// }