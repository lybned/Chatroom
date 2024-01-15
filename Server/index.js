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


const socketIo = socket(server, {
  cors:{
    origin: "http://localhost:5173",
    credentials: true,
  }
})

global.onlineUsers = new Map();

socketIo.on("connection", (socket) => {
  global.chatSocket = socket;
  
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  })

  socket.on("send-msg", (data) => {
    console.log(data)
    const sendUserSocket = onlineUsers.get(data.to)
    console.log(sendUserSocket)
    if (sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve",data.msg, data.date)
    }
  })
})