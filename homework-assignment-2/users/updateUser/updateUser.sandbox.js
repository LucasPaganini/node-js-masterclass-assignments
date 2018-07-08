"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateUser_1 = require("./updateUser");
(async () => {
    try {
        await updateUser_1.updateUser('9469681205', {
            name: 'Rafael S',
            email: 'r@gmail.com',
            address: 'aaa',
        }).then(u => {
            console.log('user updated!', u);
        });
    }
    catch (err) {
        console.log(err);
    }
})();
