const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const app=express();
app.use(express.json());
require("dotenv").config()
const cors=require("cors");
app.use(cors())

app.get("/",(req,res)=>{
    res.send("homepage")
})

app.use("/user",userRouter)

app.listen(process.env.PORT||8080,async()=>{
    try{
        await connection;
        console.log("connected to DB")
    }
    catch(err){
        console.log(err);
        console.log("cannot connect to DB");
    }
    console.log("server is running at port 8080")
})