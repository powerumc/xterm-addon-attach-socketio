"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var pty = __importStar(require("node-pty"));
var server = http_1.default.createServer(express_1.default());
var io = socket_io_1.default(server);
server.listen(1001);
console.log("Listening on *:1001");
io.on("connection", function (socket) {
    console.log("connection", socket.id);
    var term = pty.spawn("bash", [], {});
    term.on("data", function (data) {
        socket.emit("message", data);
    });
    socket.on("message", function (data) {
        term.write(data);
    });
});
