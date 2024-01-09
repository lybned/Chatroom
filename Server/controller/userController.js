const User = require("../model/userModel")
const brcypt = require("bcrypt");
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({payload:{user}}, process.env.JWT, { expiresIn: '1800s' });
}

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
    const token = generateAccessToken(user)
    return res.json({status:true, user, token})    
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

    const token = generateAccessToken(loginUser)

    return res.json({status:true, loginUser, token})    
  } catch(error){
    next(error)
  }
}


module.exports.allUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({})
    if (allUsers){
      let allUsername = allUsers.map(x => x.username)

      //Verify the token
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (token == null) return res.sendStatus(401)

      jwt.verify(token, process.env.JWT, (err, user) => {
        console.log(err)
    
        if (err) return res.sendStatus(403)
    
        req.user = user
    
        next()
      })

      console.log(token)      


      return res.json({allUsername, status:true})
    }



    return res.json({"message":"No users found.", status:false});

  } catch(error){
    next(error)
  }
}