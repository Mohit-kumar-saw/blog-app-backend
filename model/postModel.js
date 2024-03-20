const mongoose=require("mongoose")

const PostSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true,
    },
    desc:{
        type:String,
        require:true,
    },
    pic:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    categories:{
        type:String,
        require:true,
    }
},{timestamps:true,})

module.exports= mongoose.model("Post", PostSchema)