const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes=require("./routes/userRoutes");
const postRoutes=require("./routes/postRoutes");
const authRoutes=require("./routes/authRoutes");
const connectDB = require("./db/database");

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())

app.use("/api/user",userRoutes)
app.use("/api/post",postRoutes)
app.use("/api/auth",authRoutes)


connectDB;

app.listen(PORT,()=>console.log(`app is listning on port: ${PORT}`.blue.bold))
