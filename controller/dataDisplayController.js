const { surveyorLoginModel } = require("../models/loginModel");
const touristFeedback = require("../models/touristFeedback");
const handleError = require("../utils/handleError");
const verifyToken = require("../utils/verifyToken");

module.exports.surveyOverview = async (req, res) => {
	try {
		const auth = req.headers["authorization"].split(" ")[1];
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
		// const data = req.body;
		const admin = await surveyorLoginModel.findOne({
			accessToken: auth,
		});
		if (!admin) return handleError(res, 401, "access Denied");

		const ans = await touristFeedback.aggregate([
			{
				$group: {
					_id: null,
					cleanliness: { $avg: "$cleanliness.rating" },
					accessToTp: { $avg: "$accessToTp.rating" },
					costEffectiveTp: { $avg: "$costEffectiveTp.rating" },
					stay: { $avg: "$stay.rating" },
					hygiene: { $avg: "$hygiene.rating" },
					disabilityFriendly: { $avg: "$disabilityFriendly.rating" },
				},
			},
		]);
		res.send(ans);
	} catch (error) {
		console.log(error);
	}
};
