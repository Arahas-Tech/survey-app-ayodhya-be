const { surveyorLoginModel } = require("../models/loginModel");
const handleError = require("../utils/handleError");
const verifyToken = require("../utils/verifyToken");
const { surveyorView } = require("../utils/views");

module.exports.surveyors = async (req, res) => {
    const selectedFields = {
        phone: 1,
        name: 1,
        email: 1,
        role: 1,
        surveysConducted: 1
    };
	try {
		const auth = req.headers["authorization"].split(" ")[1];
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
		// const data = req.body;
		const admin = await surveyorLoginModel.findOne({
			accessToken: auth,
		});
		if (!admin) return handleError(res, 401, "access Denied");

		const surveyors = await surveyorLoginModel.find({isAdmin: false}, selectedFields);
		// const surveyors = await surveyorLoginModel.find();
        res.send(surveyors);
	} catch (error) {
		console.log(error);
	}
};