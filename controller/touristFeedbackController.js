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
				const feedback = await touristFeedbackModel.create({
					email: user.email,
					"cleanliness": fields.cleanliness,
					"accessToTp": fields.accessToTp,
					"costEffectiveTp": fields.costEffectiveTp,
					"stay": fields.stay,
					"hygiene": fields.hygiene,
					"disabilityFriendly": fields.disabilityFriendly,
					completed: fields.cleanliness && fields.accessToTp && fields.costEffectiveTp && fields.stay && fields.hygiene && fields.disabilityFriendly ? true : false,
				});
				// await touristFeedbackModel.findOneAndUpdate({ _id: feedback._id }, { "cleanliness.reasons": arr  });
				if (feedback.completed) await loginModel.updateOne({ _id: user._id }, { $set: { "surveys.touristFeedback": true } });
				res.send(feedback);
			}
		}
	} catch (error) {
		handleError(res, 401, error);
	}
};
