"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var documentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
    },
    codeLanguage: {
        type: String,
    },
    highlightedLines: {
        type: String,
    },
    text: {
        type: String,
        required: true
    }
});
var DocumentModel = (0, mongoose_1.model)('Document', documentSchema);
exports.default = DocumentModel;
