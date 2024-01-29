const otpGenerator = require('otp-generator')


const otp_config = {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true
}
const otp_length = 4;
function generateOTP(){
    console.log('working :');
    const OTP = otpGenerator.generate(otp_length, otp_config);
    console.log(OTP);
    return OTP;
}


module.exports = generateOTP ;