"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3000;
var hostname = 'localhost';
app.listen(port, hostname, function () {
    console.log("server is running on ".concat(hostname, ":").concat(port));
});
