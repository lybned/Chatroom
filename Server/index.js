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


/* Everything about the socket is listed below */
let io = socket(server, {
  cors:{
    origin: "http://localhost:5173",
    credentials: true,
  }
})

//Map user to their sockety
global.onlineUsers = new Map();

io.on("connection", (socket) => {

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  })

  //When message is sent to the server
  socket.on("send-msg", (data) => {

    //ALso notify the client who received the message
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve",data)
      socket.emit("all",data)
    }
  })
})

//maybe because the socket are different in each connection?