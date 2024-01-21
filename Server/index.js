const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require('./userRoutes/routes');
const messageRoutes = require('./messageRoutes/routes');
const socket = require("socket.io")

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DBCONNECTION)
  .then(() => {console.log("Connection successful!")})
  .catch((error) => {
    console.log(error)
  })

app.use('/api', userRoutes);
app.use('/api',  messageRoutes)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
})


let io = socket(server, {
  cors:{
    origin: "http://localhost:5173",
    credentials: true,
  }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  //console.log("Connection", socket)
  socket.on("add-user", (userId) => {
    //console.log("userId",userId)
    global.onlineUsers.set(userId, socket.id);
    //console.log("global.onlineUsers", global.onlineUsers)
  })

  socket.on("send-msg", (data) => {
    //console.log("data",data)
    //console.log("onlineUsers", global.onlineUsers)
    const sendUserSocket = onlineUsers.get(data.to)
    //console.log("sendUserSocket", sendUserSocket)
    if (sendUserSocket){
      //console.log("Seng to client")
      socket.to(sendUserSocket).emit("msg-recieve",data)
      socket.emit("all",data)
    }
  })
})

//maybe because the socket are different in each connection?