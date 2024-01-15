const messageModel = require("../model/messageModel")
const brcypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.addMesage = async (req, res, next) => {
  try {
    const {from, to, message} = req.body;
    //console.log(from, to, message)
    const data = await messageModel.create(
      {text:message,users: [from, to],sender: from}
    )

    if (data){
      res.json({message: "Added the message"})
    } else {
      res.json({message: "Failed to add the message"})
    }
  } catch (error){
    next(error)
  }
}

module.exports.getAllMesage = async (req, res, next) => {
  try{
    const { from, to }= req.query; 
    //console.log(from, to)
    const messages = await messageModel.find({
      users:{
        $all: [from, to]
      }
    }).sort({ createdAt: 1 });
    //console.log(messages)
    const returnData = messages.map(x => {
      return {
        self: x.sender.toString() === from,
        message: x.text,
        time: x.createdAt.toDateString().toString(),
        //sender: x.sender.toString()
      }
    })
    //console.log(returnData)
    res.json({returnData})

  } catch (error){
    next(error)
  }
}

