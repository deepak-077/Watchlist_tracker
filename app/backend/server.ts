import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'

const prisma= new PrismaClient();


const app=express()
app.use(cors())
app.use(bodyParser.json())

app.post("http://localhost:3001/login", async(req,res )=>{
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
               return res.status(400).json({msg:"Incorrect Password"})
            }
        }
        else(
            res.status(401).json({msg:"user not found"})
        )
    }
    catch(error){
        res.status(500).json({msg:"Login failed"})
    }
})

app.post("http://localhost:3001/signup", async(req,res )=>{
    const {firstname, lastname, email, password}=req.body;

    try{
        const existingUser=await prisma.user.findUnique({
            where:{
                email:email,
            }
        })
        if(existingUser){
            return res.status(200).json({msg:"user already exist"})
        }
        const newUser=await prisma.user.create({
            data:{
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:password
            }
        })
        res.status(200).json({msg:"user created successfully"})

    }
    catch(error){
        res.status(500).json({msg:"Signup failed"})
    }
})

app.listen(3001, ()=>{
    console.log("server started")
})