const mongoose = require("mongoose");

const temp = {
	name: {
		type: String,
	},
	privileges: {
		type: [String],
	},
}

const rolesSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	privileges: {
		type: [String],
	},
});

const roles = mongoose.model("roles", rolesSchema);

module.exports = roles;
