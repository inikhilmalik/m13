const express=require("express");
const { UserModel } = require("../models/User.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userRouter=express.Router();

userRouter.post("/signup",async(req,res)=>{
    const {username,avatar,email,password}=req.body;
    try{
        bcrypt.hash(password, 2, async (err, hash)=> {
            const user=new UserModel({username,avatar,email,password:hash});
            await user.save();
            res.send({"msg":"user is added"})
        });
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})

userRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(user)
        {   console.log(user)
            bcrypt.compare(password, user.password, function(err, result) {
                if(result)
                {
                    const token = jwt.sign({ username:user.username}, 'blog');
                    res.status(200).send({"msg":"login successful","token":token})
                }
                else{
                    res.status(401).send({"msg":"wrong password"})
                }
            });
        }
        else{
            res.send({"msg":"user not found, signup first"})
        }
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})

module.exports={userRouter}