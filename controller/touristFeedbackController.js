const touristFeedbackModel = require("../models/touristFeedback");
const loginModel = require("../models/loginModel");
const handleError = require("../utils/handleError");
const verifyToken = require("../utils/verifyToken");

module.exports.touristFeedback = async (req, res) => {
	const authToken = req.headers["authorization"].split(" ")[1];
	try {
		verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, true);
		const fields = req.body;
		const user = await loginModel.findOne({
			accessToken: authToken,
		});
		const userFeedback = await touristFeedbackModel.findOne({
			email: user.email,
		});
		if (!user) {
			handleError(res, 401, "Access Denied");
		} else {
			if (userFeedback) {
				console.log("Feedback already exists");
				res.send(userFeedback);
			} else {
				const createUserFeedback = await touristFeedbackModel.create({
					email: user.email,
					cleanliness: fields.cleanliness,
					accessToTp: fields.accessToTp,
					costEffectiveTp: fields.costEffectiveTp,
					lodging: fields.lodging,
					hygiene: fields.hygiene,
					disabilityFriendly: fields.disabilityFriendly,
				});
				res.send(createUserFeedback);
			}
		}
	} catch (error) {
		handleError(res, 401, error);
	}
};
