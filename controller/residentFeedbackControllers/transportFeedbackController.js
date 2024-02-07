const { loginModel } = require("../../models/loginModel");
const transportFeedbackModel = require("../../models/transportFeedbackModel");
const handleError = require("../../utils/handleError");
const verifyToken = require("../../utils/verifyToken");

module.exports.getTransportFeedback = async (req, res) => {
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
		const feedback = await transportFeedbackModel.findOne({
			email: user.email,
		});
		if (feedback) {
			if (!feedback.completed) res.send(feedback);
			else res.send("Feedback already exists");
		} else {
			const transportFeedback = await transportFeedbackModel.create({
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
					$set: { "surveys.transport": true },
				}
			);
			res.send(transportFeedback);
		}
	} catch (error) {
		return handleError(res, 400, error);
	}
};

module.exports.updateTransportFeedback = async (req, res) => {
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
		const transportFeedback = await transportFeedbackModel.updateOne(
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
		if (transportFeedback.completed) {
			await loginModel.findOneAndUpdate(
				{
					_id: user._id,
				},
				{
					$set: { "surveys.transport": true },
				}
			);
		}
		res.send("Survey submitted");
	} catch (error) {
		return handleError(res, 400, error);
	}
};
