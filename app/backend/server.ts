import express from "express";
import cors from 'cors';
import { PrismaClient } from '@prisma/client';



const prisma= new PrismaClient();
const app=express()
app.use(cors())
app.use(express.json())

app.post("/login", async(req, res)=>{
    const {email,password}=req.body;

    try{
        const existingUser=await prisma.user.findUnique({
            where:{
                email:email,
            }
        })
        if(existingUser){
            //check for password
            if(existingUser.password===password){
                return res.status(200).json({msg:"successfully logged in"})
            }
            else{
               return res.status(401).json({msg:"Incorrect Password"})
            }
        }
        else(
            res.status(404).json({msg:"user not found"})
        )
    }
    catch(error){
        console.log("failed to login")
        res.status(500).json({msg:"Login failed"})
    }
})

app.post("/signup", async(req,res )=>{
    const {firstname, lastname, email, password}=req.body;

    try{
        const existingUser=await prisma.user.findUnique({
            where:{
                email:email,
            }
        })
        if(existingUser){
            return res.status(400).json({msg:"user already exist"})
        }
        const newUser=await prisma.user.create({
            data:{
                firstname,
                lastname,
                email,
                password
            }
        })
        res.status(201).json({msg:"user created successfully"})

    }
    catch(error){
        console.log("signup error",error)
        res.status(500).json({msg:"Signup failed"})
    }
})

app.listen(3001, ()=>{
    console.log("server started")
})