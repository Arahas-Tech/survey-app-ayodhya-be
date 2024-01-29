const fetch = require('node-fetch');


const emailValidator = async (email) => {
    try {
        const url = `https://api.testmail.top/domain/check?data=${email}&ip=8.8.8.8`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: process.env.TESTMAIL_API_KEY,
            },
        });

        const contentType = response.headers.get('content-type');
        const responseBody = await response.text();

        if (contentType.includes('text/html')) {
            console.log("Received HTML response. It might be a redirect page.");
            console.log("HTML Content:", responseBody);
        } else {
            console.log("Received JSON response:");
            // console.log(JSON.parse(responseBody));
			return JSON.parse(responseBody);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

module.exports = emailValidator;