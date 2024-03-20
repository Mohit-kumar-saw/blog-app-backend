const userModel = require("../model/userModel");
const { findByIdAndUpdate } = require("../model/userModel");
const bcrypt=require("bcrypt")
const postModel = require("../model/postModel");

const update = async (req, res) => {
if(req.body.userId === req.params.id){
  if(req.body.password){
    const salt = await bcrypt.genSalt(10)
    req.body.password=await  bcrypt.hash(req.body.password,salt)

  }
  try {
    const updateUser=await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set:req.body,
      },{
        new:true,
      }
    )
    res.status(200).json(updateUser)
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
}else{
  res.status(401).json("You cant  upate your account")
}
};

const deleteUser=async(req,res)=>{
if(req.body.userId === req.params.id){

  const user= await userModel.findById(req.params.id)
   try {
    await postModel.deleteMany({username : user.username})

    await userModel.findByIdAndDelete(req.params.id)

    res.status(200).json("user deleted successfully...")
   } catch (error) {
    res.status(500).json("user not found...")
   }
}else(
  res.status(401).json("You can delete only your account")
)
}

const getUser=async(req,res)=>{

  try {
    const user = await userModel.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const {password,...other}= user._doc
    res.status(200).json(other)
  } catch (error) {
    res.status(400).json(error)
    console.log(error);

  }
}



module.exports={update,deleteUser,getUser}