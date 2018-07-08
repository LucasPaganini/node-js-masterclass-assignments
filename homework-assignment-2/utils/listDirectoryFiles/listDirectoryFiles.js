"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.listDirectoryFiles = (dirPath) => new Promise((resolve, reject) => {
    fs_1.readdir(dirPath, (err, files) => {
        if (err)
            reject(err);
        resolve(files);
    });
});
