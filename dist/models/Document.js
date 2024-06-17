"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
    },
    text: {
        type: String,
        required: true
    }
});
const DocumentModel = (0, mongoose_1.model)('Document', documentSchema);
exports.default = DocumentModel;
