"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const config_1 = require("../config");
_1.createCharge(config_1.stripeKeys, {
    amount: 999,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: config_1.myEmail,
}).then(console.log);
