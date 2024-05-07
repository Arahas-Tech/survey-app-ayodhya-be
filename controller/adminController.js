const createFormModel = require("../models/createFormModel");
const formModel = require("../models/formModel");
const { surveyorLoginModel } = require("../models/loginModel");
const touristFeedback = require("../models/touristFeedback");
const handleError = require("../utils/handleError");
const { roleCheck } = require("../utils/roleCheck");
const verifyToken = require("../utils/verifyToken");

module.exports.surveyOverview = async (req, res) => {
	try {
		if (!req.headers["authorization"]) return handleError(res, 401, "Error: No token found. Please login.");
		const auth = req.headers["authorization"].split(" ")[1];
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
		const admin = await surveyorLoginModel.findOne({
			accessToken: auth,
		});
		if (!admin) return handleError(res, 401, "access Denied");

		const model = await createFormModel('Tourist Survey');

		const questions = await formModel.findOne({
			formName: 'Tourist Survey'
		});
		const fields = questions.formFields.map((field) => {
			return { fieldName: field.fieldName, avg: { $avg: `$${field.fieldName}` } };
		});

		console.log(fields);

		const ans = await model.aggregate([
			{
				$group: {
					_id: null,
					// stay: { $avg: "$stay" },
					...fields.reduce((acc, field) => ({ ...acc, [field.fieldName]: field.avg }), {})
				},
			},
		]);
		res.send(ans);
	} catch (error) {
		return handleError(res, 400, "Error- " + error);
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
		if (!req.headers["authorization"]) return handleError(res, 401, "Error: No token found. Please login.");
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
		return handleError(res, 400, "Error- " + error);
	}
};

module.exports.updateSurveyor = async (req, res) => {
	try {
		if (!req.headers["authorization"]) return handleError(res, 401, "Error: No token found. Please login.");
		const auth = req.headers["authorization"].split(" ")[1];
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
		const adminAuth = await surveyorLoginModel.findOne({ accessToken: auth });
		if (!(await roleCheck(res, adminAuth, "update_surveyor"))) return res.send("Access Denied");

		if (req.body.updatedRole === "admin") return res.send("Cannot change role to admin");
		if (req.body.updatedRole === req.body.role) return res.send("No Changes");

		await surveyorLoginModel.findOneAndUpdate(
			{
				$or: [{ email: req.body.phoneNumberOrEmail }, { phone: req.body.phoneNumberOrEmail }],
			},
			{
				role: req.body.updatedRole,
			}
		);
		res.send("Role Updated");
	} catch (error) {
		return handleError(res, 400, "Error - " + error);
	}
};

module.exports.createForm = async (req, res) => {
	try {
		if (!req.headers["authorization"]) return handleError(res, 401, "Error: No token found. Please login.");
		const auth = req.headers["authorization"].split(" ")[1];
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
		const adminAuth = await surveyorLoginModel.findOne({ accessToken: auth });
		if (!(await roleCheck(res, adminAuth, "create_form"))) return res.send("Access Denied");

		// const form = {
		// 	formName: req.body.formName,
		// 	city: req.body.city,
		// 	subject: req.body.subject,
		// 	formFields: req.body.formFields
		// }
		const form = req.body;
		await formModel.create(form);
		res.send("form submitted");
	} catch (error) {
		return handleError(res, 400, "Error - " + error);
	}
};

module.exports.updateForm = async (req, res) => {
	try {
		if (!req.headers['authorization']) return handleError(res, 401, 'Error: No token found. Please login.');
		const auth = req.headers['authorization'].split(' ')[1];
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
		const adminAuth = await surveyorLoginModel.findOne({ accessToken: auth });
		if (!(await roleCheck(res, adminAuth, 'update_form'))) return res.send('Access Denied');

		const fields = req.body.formFields;
		const name = res.body.formName;

		const updatedForm = await formModel.findOneAndUpdate(
			{
				formName: name,
			},
			{
				$set: { formFields: fields.formFields },
			}
		);

		if (!updatedForm) return handleError(res, 404, 'Error: 404 not found');
		res.send('Form updated');
	} catch (error) {
		handleError(res, 400, 'Error - ' + error);
	}
};

module.exports.getForm = async (req, res) => {
	try {
		if (!req.headers['authorization']) return handleError(res, 401, 'Error: No token found. Please login.');
		const auth = req.headers['authorization'].split(' ')[1];
		verifyToken(auth, process.env.ACCESS_TOKEN_SECRET, true);
		const adminAuth = await surveyorLoginModel.findOne({ accessToken: auth });
		if (!(await roleCheck(res, adminAuth, 'update_form'))) return res.send('Access Denied');

		const name = req.body.formName;
		const form = await formModel.findOne({ formName: name });

		res.send(form);
	} catch (error) {
		handleError(res, 400, 'Error - ' + error);
	}
};
