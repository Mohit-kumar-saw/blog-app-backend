const generateToken = require("../config/generateToken");
const UserModel = require("../model/userModel");
const bcrypt=require("bcrypt")

const addUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser= new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
    })

    const user=await newUser.save()
    res.status(200).json(user)


  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
};

// const login=async(req,res)=>{
//   try {
//     const user=await userModel.findOne({username:req.body.username})

//     !user && res.status(400).json("wrong username")

//     const validate= await bcrypt.compare(req.body.password, user.password) 

//     !validate && res.status(400).json("wrong password")

//     if(user && validate){
//       console.log("logined...");

//     }
//     else{
//       console.log("wrong username or password");
//       return;
//     }

//     const {password,...other} = user._doc
//     res.status(200).json(other)
//   } catch (error) {
//     res.status(500).json(error)
//     console.log(error);
//   }
// }

const login = async (req, res) => {
  const { name, password } = req.body;

  const user = await UserModel.findOne({ name });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Generate and return token if login is successful
  const token = generateToken(user._id);
  
  // Exclude password field from user object
  const { password: omitPassword, ...userWithoutPassword } = user.toObject();

  res.json({ user: userWithoutPassword, token });
};




module.exports = { addUser,login };

