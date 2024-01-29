const jwt = require("jsonwebtoken");

const verifyToken = (token, secret, required) => {
    if (required) {
        return jwt.verify(token, secret);
	}
    
    var valid   = true;
	const decode = jwt.verify(token, secret, function (error) {
        if (error) {
			valid = false;
            console.log(error.message);
		}
	});
    return valid;
};

module.exports = verifyToken;
