const messageModel = require("../model/messageModel")
const brcypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.addMesage = async (req, res, next) => {
  try {
    const {from, to, message} = req.body;

    const data = await messageModel.create({
      message:message,
      users: [from, to],
      sender: from,
    })

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
  
}

