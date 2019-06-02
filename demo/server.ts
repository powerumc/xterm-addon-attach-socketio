import express from "express";
import http from "http";
import socketio from "socket.io";
import * as pty from "node-pty";

const server = http.createServer(express());
const io = socketio(server);

server.listen(1001);
console.log("Listening on *:1001");

io.on("connection", socket => {
  console.log("connection", socket.id);

  const term = pty.spawn("bash", [], {});
  term.on("data", data => {
    socket.emit("message", data);
  });

  socket.on("message", data => {
    term.write(data);
  });
});
