const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = new socketio.Server(server);

// Here we will have key-vlaue pair for which user is having which ID
// Basically we are storing all the users with thir key-value pair here
const users = {};

io.on("connection", (socket) => {
  //   console.log("User Connected!!");
  //   here we are listining the msg sent means the data we have sended
  //   via script.js file we are receiving it here.
  socket.on("send-msg", (data) => {
    console.log(data);

    // Sending the received data from server to the user via pipe
    // If we want to send the msg in one socket pipeline --> socket.emit
    // If we want to send the msg to all socket pipeline --> io.emit
    io.emit("received-msg", {
      id: socket.id,
      msg: data.msg,
      username: users[socket.id],
    });
  });

  socket.on("login", (data) => {
    // Mapping socket id with the user
    users[socket.id] = data.username;
  });
});

app.use("/", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4444;
server.listen(PORT, () => {
  console.log("Server is up at port", PORT);
});
