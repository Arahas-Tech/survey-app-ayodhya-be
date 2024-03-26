const touristFeedbackModel = require("../models/touristFeedback");
const { surveyorLoginModel } = require("../models/loginModel");
const handleError = require("../utils/handleError");
const verifyToken = require("../utils/verifyToken");

module.exports.touristFeedback = async (req, res) => {
	try {
		const authToken = req.headers["authorization"].split(" ")[1];
		verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, true);
		if (!(await roleCheck(res, adminAuth, "surveyo_tourist"))) return res.send("Access Denied");
		const fields = req.body;
		const surveyor = await surveyorLoginModel.findOne({
			accessToken: authToken,
		});
		if (!surveyor) {
			return handleError(res, 401, "Access Denied");
		}
		await touristFeedbackModel.create({
			surveyorEmail: surveyor.email,
            latitude: surveyor.latitude,
            longitude: surveyor.longitude,
            region: surveyor.region,
		});
		await surveyorLoginModel.findOneAndUpdate({ _id: surveyor._id }, { $inc: { touristSurveys: 1 } });
		res.send("Survey Completed");
	} catch (error) {
		return handleError(res, 400, error);
	}
};