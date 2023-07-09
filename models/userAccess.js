var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserAccessSchema = new Schema({
    accesscode: {
		type: String,
		required: true
	},
    userid: {
		type: String,
		required: true
	},
    fieldlist: {
		type: String,
		required: true
	},
	expirydate: {
		type: Date,
		required: true
	}
}, { timestamps: true });

// export userschema
module.exports = mongoose.model("UserAccess", UserAccessSchema);