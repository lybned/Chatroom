const User = require("../model/userModel")
const brcypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")


function generateAccessToken(user) {
  return jwt.sign({payload:{user}}, process.env.JWT, { expiresIn: '1800s' });
}

module.exports.register = async (req, res, next) => {
  try{

    const {username, email, password} = req.body;

    const usernameCheck = await User.findOne({username});
    //console.log(usernameCheck)
    if (usernameCheck){
      return res.json({"message":"Username already exists.", status:false});
    }

    const emailCheck = await User.findOne({email});
    //console.log(emailCheck)
    if (emailCheck){
      return res.json({"message":"Email already exists.", status:false});
    }

    if (username.length < 4 || password.length < 4) {
      return res.json({"message":"Username and password must have at least 5 characters.", status:false});
    }

    const passwordHash = await brcypt.hash(password,10)

    const user = await User.create({
      email,
      username,
      password: passwordHash
    })

    delete user.password;
    const token = generateAccessToken(user)
    return res.json({status:true, user, token})    
  } catch(error){
    next(error)
  }

}




module.exports.login = async (req, res, next) => {
  try{
    const {username, password} = req.body;

    const loginUser = await User.findOne({username});
    if (!loginUser){
      return res.json({"message":"Incorrect Username or Password", status:false});
    }

    brcypt.compare(password, loginUser.password, (error, result) =>{
      if (error){
        console.log(error)
        return res.json({"message":"Incorrect Username or Password", status:false});
      } else {
        if (result){
          delete loginUser.password;

          const token = generateAccessToken(loginUser)

          return res.json({status:true, loginUser, token})    
        } else {
          return res.json({"message":"Incorrect Username or Password", status:false});
        }
      }
      
    })

  } catch(error){
    next(error)
  }
}


module.exports.allUsers = async (req, res, next) => {
  try {
    //const allUsers = await User.find({}, '-password')
    //if (allUsers){
      //let allUsername = allUsers.map(x => x.username)
      
      //Verify the token
      let a = ""
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (token == null) return res.sendStatus(401)

      jwt.verify(token, process.env.JWT, (err, user) => {
        console.log(err)
    
        if (err) return res.sendStatus(403)
    
        req.user = user
        a = user.payload.user._id

      })

 
      const excludedId = new mongoose.Types.ObjectId(a )
      const allUsers = await User.find({ _id: { $ne: excludedId } })
      return res.json({allUsers,status:true})
    //}
    //return res.json({"message":"No users found.", status:false});

  } catch(error){
    next(error)
  }
}

module.exports.currentUser = async (req, res, next) => {
  try {
    //Verify the token
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT, (err, user) => {
      //console.log(err)

      if (err) return res.sendStatus(403)

      req.user = user
      
      data = user.payload.user
      delete data.password;
      return res.json({data, status:true})

    })    
  } catch(error){
    next(error)
  }
}