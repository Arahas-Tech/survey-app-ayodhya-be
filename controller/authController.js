const { loginModel, surveyorLoginModel } = require("../models/loginModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// util functions
const handleError = require("../utils/handleError");
const emailValidator = require("../utils/emailValidator");
const userView = require("../utils/userView");
const verifyToken = require("../utils/verifyToken");
// const generateOTP = require('../utils/generateOTP')

const maxAgeAccessToken = 24 * 60 * 60;
// const maxAgeAccessToken = 10;
const maxAgeRefreshToken = 7 * 24 * 60 * 60;
// const maxAgeRefreshToken = 10;

const createToken = (id, age, tokenSecret) => {
	return jwt.sign({ id }, tokenSecret, {
		expiresIn: age,
	});
};

module.exports.signup = async (req, res) => {
	const { email, password, phone, name } = req.body;

	try {
		const user = await loginModel.findOne({
			$or: [{ email: email }, { phone: phone }],
		});

		if (user) {
			console.log("User email or phone number already exists");
			res.send("User email or phone number already exists");
		} else {
			const emailCheck = await emailValidator(email);
			console.log(emailCheck);

			if (!emailCheck.result) {
				// if (false) {
				return handleError(res, 400, emailCheck.error + ": " + emailCheck.message);
			}
			const user = await loginModel.create({
				email,
				password,
				phone,
				name,
			});
			const accessToken = createToken(user._id, maxAgeAccessToken, process.env.ACCESS_TOKEN_SECRET);
			const refreshToken = createToken(user._id, maxAgeRefreshToken, process.env.REFRESH_TOKEN_SECRET);
			await user.updateOne({
				$set: {
					accessToken: accessToken,
					refreshToken: refreshToken,
				},
			});
			user.accessToken = accessToken;
			user.refreshToken = refreshToken;
			console.log("Account successfully created");
			res.send(userView(user));
		}
	} catch (error) {
		return handleError(res, 400, "Error in signIn/creating account- " + error);
	}
};

module.exports.surveyorSignup = async (req, res) => {
	const { email, password, phone, name } = req.body;

	try {
		const surveyor = await surveyorLoginModel.findOne({
			$or: [{ email: email }, { phone: phone }],
		});
		if (surveyor) {
			console.log("User email or phone number already exists");
			res.send("User email or phone number already exists");
		} else {
			const emailCheck = await emailValidator(email);
			console.log(emailCheck);

			if (!emailCheck.result) {
				// if(false){
				return handleError(res, 400, emailCheck.error + ": " + emailCheck.message);
			}
			console.log("reached");
			const surveyor = await surveyorLoginModel.create({
				email,
				password,
				phone,
				name,
			});
			const accessToken = createToken(surveyor._id, maxAgeAccessToken, process.env.ACCESS_TOKEN_SECRET);
			const refreshToken = createToken(surveyor._id, maxAgeRefreshToken, process.env.REFRESH_TOKEN_SECRET);
			await surveyor.updateOne({
				$set: {
					accessToken: accessToken,
					refreshToken: refreshToken,
				},
			});
			surveyor.accessToken = accessToken;
			surveyor.refreshToken = refreshToken;
			console.log("Account successfully created");
			res.send(userView(surveyor));
		}
	} catch (error) {
		return handleError(res, 400, "Error in signIn/creating account- " + error);
	}
};

module.exports.getUserDetailFromToken = async (req, res) => {
	const authToken = req.headers["authorization"].split(" ")[1];
	const refreshToken = req.headers["authorization"].split(" ")[2];

	if ((!authToken && !refreshToken) || !refreshToken) {
		return handleError(res, 401, "Access Denied. Login in again");
	}

	try {
		verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET, true);
		const accessTokenVerification = verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, false);
		if (accessTokenVerification) {
			if (accessTokenVerification === true) {
				const user = await loginModel.findOne({
					accessToken: authToken,
				});
				if (!user) {
					return handleError(res, 404, "No user found with this token");
				}
				res.send(userView(user));
				console.log("Login authenticated using access token");
			}
		} else {
			const user = await loginModel.findOne({
				refreshToken: refreshToken,
			});
			if (!user) {
				res.send("User Logged Out");
			} else {
				const accessToken = createToken(user._id, maxAgeAccessToken, process.env.ACCESS_TOKEN_SECRET);
				const updatedUser = await loginModel.findOneAndUpdate(
					{
						refreshToken: refreshToken,
					},
					{
						accessToken: accessToken,
					},
					{ new: true }
				);
				console.log("Login Authenticated and created accesstoken is: ", accessToken);
				res.status(200).send(userView(updatedUser));
			}
		}
	} catch (error) {
		return handleError(res, 500, error.message);
	}
};

module.exports.login = async (req, res) => {
	const user = req.body;
	try {
		const userAuth = await loginModel.findOne({
			$or: [{ email: user.email }, { phone: user.phone }],
		});

		if (!userAuth) {
			return handleError(res, 404, "No account with this email or phone number.");
		}
		const auth = await bcrypt.compare(user.password, userAuth.password);
		if (!auth) {
			return handleError(res, 401, "Credentials don't match.");
		}
		console.log("Authentication successful");
		const authToken = createToken(userAuth._id, maxAgeAccessToken, process.env.ACCESS_TOKEN_SECRET);
		const refreshToken = createToken(userAuth._i, maxAgeRefreshToken, process.env.REFRESH_TOKEN_SECRET);
		try {
			const updatedUser = await loginModel.findOneAndUpdate(
				{
					$or: [{ email: user.email }, { phone: user.phone }],
				},
				{
					name: "name is changed",
					accessToken: authToken,
					refreshToken: refreshToken,
				},
				{ new: true }
			);
			res.send(userView(updatedUser));
		} catch (err) {
			return handleError(res, 500, "ERROR WHILE UPDATING TOKEN- " + err);
		}
	} catch (error) {
		return handleError(res, 502, "Error getting the req- " + error);
	}
};

module.exports.surveyorLogin = async (req, res) => {
	const surveyor = req.body;
	try {
		const surveyorAuth = await surveyorLoginModel.findOne({
			$or: [{ email: surveyor.email }, { phone: surveyor.phone }],
		});

		if (!surveyorAuth) {
			return handleError(res, 404, "No account with this email or phone number.");
		}
		const auth = await bcrypt.compare(surveyor.password, surveyorAuth.password);
		if (!auth) {
			return handleError(res, 401, "Credentials don't match.");
		}
		console.log("Authentication successful");
		const authToken = createToken(surveyorAuth._id, maxAgeAccessToken, process.env.ACCESS_TOKEN_SECRET);
		const refreshToken = createToken(surveyorAuth._i, maxAgeRefreshToken, process.env.REFRESH_TOKEN_SECRET);
		try {
			const updatedSurveyor = await surveyorLoginModel.findOneAndUpdate(
				{
					$or: [{ email: surveyor.email }, { phone: surveyor.phone }],
				},
				{
					accessToken: authToken,
					refreshToken: refreshToken,
				},
				{ new: true }
			);
			res.send(userView(updatedSurveyor));
		} catch (err) {
			return handleError(res, 500, "ERROR WHILE UPDATING TOKEN- " + err);
		}
	} catch (error) {
		return handleError(res, 502, "Error getting the req- " + error);
	}
};

module.exports.logout = async (req, res) => {
	const authToken = req.headers["authorization"].split(" ")[1];
	const userType = req.body;
	try {
		verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, true);
		if (userType === "resident") {
			await surveyorLoginModel.findOneAndUpdate(
				{
					accessToken: authToken,
				},
				{
					accessToken: null,
					refreshToken: null,
				}
			);
		} else {
			await surveyorLoginModel.findOneAndUpdate(
				{
					accessToken: authToken,
				},
				{
					accessToken: null,
					refreshToken: null,
				}
			);
		}
		res.send("You have been Logged out.");
	} catch (error) {
		return handleError(res, 401, error);
	}
};
