module.exports.userView = (user) => {
	const view = {
		name: user.name,
		email: user.email,
		phone: user.phone,
		accessToken: user.accessToken,
		refreshToken: user.refreshToken,
		temp: user.accessToken + " " + user.refreshToken,
	};
	return view;
};
module.exports.surveyorView = (surveyor) => {
	const view = {
		name: surveyor.name,
		email: surveyor.email,
		phone: surveyor.phone,
		accessToken: surveyor.accessToken,
		refreshToken: surveyor.refreshToken,
		temp: surveyor.accessToken + " " + surveyor.refreshToken,
		surveysConducted: surveyor.surveysConducted,
	};
	return view;
};

// module.exports = userView;
// module.exports = surveyorView;