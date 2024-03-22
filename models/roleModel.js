const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
	name: {
		type: String,
		// required: true,
	},
	privileges: {
		type: [String],
		// required: true,
	},
});

const roles = mongoose.model("roles", rolesSchema);

module.exports = roles;
