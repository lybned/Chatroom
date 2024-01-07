const User = require("../model/userModel")
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try{
    const {username, email, password} = req.body;


    const usernameCheck = await User.findOne({username});
    console.log(usernameCheck)
    if (usernameCheck){
      return res.json({"message":"Username already exists", status:false});
    }

    const emailCheck = await User.findOne({email});
    console.log(emailCheck)
    if (emailCheck){
      return res.json({"message":"Email already exists", status:false});
    }

    const passwordHash = await brcypt.hash(password,10)

    const user = await User.create({
      email,
      username,
      password: passwordHash
    })

    delete user.password;

    return res.json({status:true, user})    
  } catch(error){
    next(error)
  }

}




module.exports.login = async (req, res, next) => {
  try{
    const {username, password} = req.body;

    const passwordHash = await brcypt.hash(password,10)

    const loginUser = await User.findOne({username});
    if (!loginUser){
      return res.json({"message":"Incorrect Username or Password", status:false});
    }

    const validation = brcypt.compare(password, loginUser.password)
    if (!validation){
      return res.json({"message":"Incorrect Username or Password", status:false});
    }

    delete loginUser.password;

    return res.json({status:true, loginUser})    
  } catch(error){
    next(error)
  }

}