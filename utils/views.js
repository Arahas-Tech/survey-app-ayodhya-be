module.exports.tokens = (data) => {
	const tokenData = {
		isAdmin: data.isAdmin,
		// role: data.role,
		// gisSurveys: data.gisSurveys,
		// touristSurveys: data.touristSurveys,
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
		temp: data.accessToken + " " + data.refreshToken,
		role: data.role,
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
		role: surveyor.role,
		gisSurveys: surveyor.gisSurveys,
		touristSurveys: surveyor.touristSurveys,
	};
	return view;
};

module.exports.adminView = (admin) => {
	const view = {
		name: admin.name,
		email: admin.email,
		phone: admin.phone,
	}; 
	return view;
};
