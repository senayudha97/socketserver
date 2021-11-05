const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
const moment = require("moment");

const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", function (reg, res) {
  return res.send({ error: true, message: "Halloo" });
});

// Global Var
let cUser = {};

io.on("connection", (socket) => {
  socket.on("kenalan", (param) => {
    cUser = param;
    console.log(cUser);
    console.log(
      "a user connected =" +
        cUser.nama +
        " at " +
        moment().format("MMMM Do YYYY, h:mm:ss a")
    );
  });

  socket.on("disconnect", () => {
    console.log(
      "user disconnect =" +
        cUser.nama +
        " at " +
        moment().format("MMMM Do YYYY, h:mm:ss a")
    );
  });

  socket.emit("hello", "world");
  // socket.broadcast.emit("hello", "world");

  socket.on("panggil", (param) => {
    console.log(param);
  });
});

server.listen(port, () => {
  console.log("listening on *:" + port);
});
