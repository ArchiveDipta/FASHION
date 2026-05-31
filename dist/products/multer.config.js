"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileFilter = exports.productStorage = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const crypto_1 = require("crypto");
exports.productStorage = (0, multer_1.diskStorage)({
    destination: './uploads/products',
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${(0, crypto_1.randomUUID)()}${(0, path_1.extname)(file.originalname)}`);
    },
});
const imageFileFilter = (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/i)) {
        return callback(new Error('Only image files are allowed'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
//# sourceMappingURL=multer.config.js.map