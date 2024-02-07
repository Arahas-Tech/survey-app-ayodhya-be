const mongoose = require("mongoose");

const subField = new mongoose.Schema({
	_id: false,
	rating: {
		type: Number,
		min: 1,
		max: 5,
		default: null,
	},
	reasons: [],
});

const waterFeedback = new mongoose.Schema({
    email: {
		type: String,
		required: true
	},
	field1: {
		type: subField,
		default: null,
	},
	field2: {
		type: subField,
		default: null,
	},
    completed: {
        type: Boolean,
        default: false
    },
},
{
    versionKey:false,
    timestamps:true,
}
);

const waterFeedbackModel = new mongoose.model('waterFeedback', waterFeedback)

module.exports = waterFeedbackModel;
