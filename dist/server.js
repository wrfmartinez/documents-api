"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Document_1 = __importDefault(require("./models/Document"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT | 3000;
app.use(body_parser_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_URI);
mongoose_1.default.connection.on("connected", () => {
    console.log(`Connected to ${mongoose_1.default.connection.name}`);
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = yield Document_1.default.find();
    res.status(200).json(documents);
}));
app.post("/document/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newDocument = yield Document_1.default.create(req.body);
    yield newDocument.save();
    res.status(201).json(newDocument);
}));
app.put("/document/:documentId/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const editDocument = yield Document_1.default.findByIdAndUpdate(req.params.documentId);
    yield (editDocument === null || editDocument === void 0 ? void 0 : editDocument.save());
    res.status(201).json(editDocument);
}));
app.delete("/document/:documentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteDocument = yield Document_1.default.findByIdAndDelete(req.params.documentId);
    yield (deleteDocument === null || deleteDocument === void 0 ? void 0 : deleteDocument.save());
    res.status(200).json(deleteDocument);
}));
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
