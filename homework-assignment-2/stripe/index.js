"use strict";
// curl https://api.stripe.com/v1/charges \
// -u sk_test_BQokikJOvBiI2HlWgH4olfQ2: \
// -d amount = 999 \
// -d currency = usd \
// -d source = tok_visa \
// -d receipt_email = "jenny.rosen@example.com"
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const querystring = require("querystring");
const base64Encode = (string) => Buffer.from(string).toString('base64');
exports.createCharge = (stripeAuth, charge) => {
    return new Promise((resolve, reject) => {
        const postData = querystring.stringify(charge);
        const options = {
            hostname: 'api.stripe.com',
            port: 443,
            path: '/v1/charges',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length,
                Authorization: `Basic ${base64Encode(stripeAuth.secret)}:`,
            },
        };
        const req = https.request(options, res => {
            let resData = '';
            res.on('error', reject);
            res.on('data', data => (resData += data));
            res.on('end', () => {
                try {
                    resolve(JSON.parse(resData));
                }
                catch (err) {
                    reject(err);
                }
            });
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
};
