// importing modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
    firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	mobile: {
		type: String
	},
	addressline1: {
		type: String
	},
	addressline2: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	country: {
		type: String
	},
	gender: {
		type: String
	},
	dateofbirth: {
		type: Date
	}


});


// export userschema
module.exports = mongoose.model("User", UserSchema);