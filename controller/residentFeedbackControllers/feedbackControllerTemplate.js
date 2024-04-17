// replace 'survey_name_' with the name of survey

const { loginModel } = require("../../models/loginModel");
const survey_name_FeedbackModel = require("../../models/survey_name_FeedbackModel");
const handleError = require("../../utils/handleError");
const verifyToken = require("../../utils/verifyToken");

module.exports.getsurvey_name_Feedback = async (req, res) => {
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
		const feedback = await survey_name_FeedbackModel.findOne({
			email: user.email,
		});
		if (feedback) {
			if (!feedback.completed) res.send(feedback);
			else res.send("Feedback already exists");
		} else {
			const survey_name_Feedback = await survey_name_FeedbackModel.create({
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
					$set: { "surveys.survey_name_": true },
				}
			);
			res.send(survey_name_Feedback);
		}
	} catch (error) {
		return handleError(res, 400, error);
	}
};

module.exports.updatesurvey_name_Feedback = async (req, res) => {
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
		const survey_name_Feedback = await survey_name_FeedbackModel.updateOne(
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
		if (survey_name_Feedback.completed) {
			await loginModel.findOneAndUpdate(
				{
					_id: user._id,
				},
				{
					$set: { "surveys.survey_name_": true },
				}
			);
		}
		return res.send("Survey submitted");
	} catch (error) {
		return handleError(res, 400, error);
	}
};
