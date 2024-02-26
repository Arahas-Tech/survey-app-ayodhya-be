const { loginModel } = require("../../models/loginModel");
const waterFeedbackModel = require("../../models/waterFeedbackModel");
const handleError = require("../../utils/handleError");
const verifyToken = require("../../utils/verifyToken");

module.exports.getWaterFeedback = async (req, res) => {
	try {
		const authToken = req.headers["authorization"].split(" ")[1];
		verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, true);
		const fields = req.body;
		const user = await loginModel.findOne({
			accessToken: authToken,
		});
		if (!user) {
			return handleError(res, 401, "User session timed out");
		}
		const feedback = await waterFeedbackModel.findOne({
			email: user.email,
		});
		if (feedback) {
			if (!feedback.completed) res.send(feedback);
			else res.send("Feedback already exists");
		} else {
			const waterFeedback = await waterFeedbackModel.create({
				email: user.email,
				field1: fields.field1,
				field2: fields.field2,
				completed: fields.field1 && fields.field2 ? true : false,
			});
			await loginModel.findOneAndUpdate(
				{
					_id: user._id,
				},
				{
					$set: { "surveys.water": true },
				}
			);
			res.send(waterFeedback);
		}
	} catch (error) {
		return handleError(res, 400, error);
	}
};

module.exports.updateWaterFeedback = async (req, res) => {
	const authToken = req.headers["authorization"].split(" ")[1];
	try {
		verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, true);
		const fields = req.body;
		const user = await loginModel.findOne({
			accessToken: authToken,
		});
		if (!user) {
			return handleError(res, 401, "User session timed out");
		}
		const waterFeedback = await waterFeedbackModel.updateOne(
			{
				email: user.email,
			},
			{
				$set: {
					field1: fields.field1,
					field2: fields.field2,
					completed: fields.field1 && fields.field2 ? true : false,
				},
			}
		);
		if (waterFeedback.completed) {
			await loginModel.findOneAndUpdate(
				{
					_id: user._id,
				},
				{
					$set: { "surveys.water": true },
				}
			);
		}
		return res.send("Survey submitted");
	} catch (error) {
		return handleError(res, 400, error);
	}
};
