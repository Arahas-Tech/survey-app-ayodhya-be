module.exports.tokens = (data) => {
	const tokenData = {
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
		// temp: data.accessToken + " " + data.refreshToken,
	}
	return tokenData;
}

module.exports.userView = (user) => {
	const view = {
		name: user.name,
		email: user.email,
		phone: user.phone,
	};
	return view;
};
module.exports.surveyorView = (surveyor) => {
	const view = {
		name: surveyor.name,
		email: surveyor.email,
		phone: surveyor.phone,
		surveyorType: surveyor.type,
		surveysConducted: surveyor.surveysConducted,
	};
	return view;
};

module.exports.adminView = (admin) => {
	const view = {
		name: admin.name,
		email: admin.email,
		phone: admin.phone,
		surveysConducted: admin.surveysConducted,
	};
	return view;
};

// module.exports = userView;
// module.exports = surveyorView;