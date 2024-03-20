const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

const connectDB= mongoose.connect(process.env.URL).then(
    console.log("DataBase Connected...".yellow.bold)
)

module.exports=connectDB