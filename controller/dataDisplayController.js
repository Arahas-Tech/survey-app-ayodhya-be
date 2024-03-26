const { surveyorLoginModel } = require("../models/loginModel");
const touristFeedback = require("../models/touristFeedback");
const handleError = require("../utils/handleError");
const { roleCheck } = require("../utils/roleCheck");
const verifyToken = require("../utils/verifyToken");

module.exports.surveyOverview = async (req, res) => {
	try {
		const auth = req.headers["authorization"].split(" ")[1];
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
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

module.exports.surveyors = async (req, res) => {
	const selectedFields = {
		phone: 1,
		name: 1,
		email: 1,
		role: 1,
		gisSurveys: 1,
		touristSurveys: 1,
	};
	try {
		const auth = req.headers["authorization"].split(" ")[1];
		const role = req.body.role;
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
		const adminAuth = await surveyorLoginModel.findOne({ accessToken: auth });
		if (!(await roleCheck(res, adminAuth, "surveyor_signup"))) return res.send("Access Denied");
		let query;
		if (role && role === "admin") query = { isAdmin: true };
		else if (role) query = { isAdmin: false, role: role };
		else query = { isAdmin: false };
		// const surveyors = await surveyorLoginModel.find({isAdmin: false}, selectedFields);
		const surveyors = await surveyorLoginModel.find(query, selectedFields);
		res.send(surveyors);
	} catch (error) {
		console.log(error);
	}
};

module.exports.updateSurveyor = async (req, res) => {
    try {
        
        const auth = req.headers["authorization"].split(" ")[1];
        verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
        const adminAuth = await surveyorLoginModel.findOne({ accessToken: auth });
        if (!(await roleCheck(res, adminAuth, "update_surveyor"))) return res.send("Access Denied");
        
        if(req.body.updatedRole === 'admin')    return res.send('Cannot change role to admin')
        if(req.body.updatedRole === req.body.role) return res.send('No Changes');

        await surveyorLoginModel.findOneAndUpdate({
            $or: [{ email: req.body.phoneNumberOrEmail }, { phone: req.body.phoneNumberOrEmail }],
        },{
            role: req.body.updatedRole
        })
        res.send("Role Updated");
    } catch (error) {
        return handleError(res, 400, "Error - " + error)
    }
};
