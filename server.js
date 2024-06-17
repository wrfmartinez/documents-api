"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var express = require("express");
var mongoose_1 = require("mongoose");
dotenv.config();
var app = express();
mongoose_1.default.connect(process.env.MONGODB_URI);
mongoose_1.default.connection.on("connected", function () {
    console.log("Connected to ".concat(mongoose_1.default.connection.name));
});
app.get("/", function (req, res) {
    res.send("Hello world");
});
var PORT = process.env.PORT | 3000;
app.listen(PORT, function () {
    console.log("Listening on PORT ".concat(PORT));
});
