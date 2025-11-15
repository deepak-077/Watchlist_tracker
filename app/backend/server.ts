import express from "express";
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";


const prisma= new PrismaClient();
const app=express()
app.use(cors())
app.use(express.json())
const JWT_SECRET="secret";

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
                const token=jwt.sign({userId:existingUser.id},JWT_SECRET,{expiresIn:"1h"})
                return res.status(200).json({msg:"successfully logged in",token})
            }
            else{
               return res.status(401).json({msg:"Incorrect Password"})
            }
        }
        else{
            res.status(404).json({msg:"user not found"})
        }
    }
    catch(error){
        console.log("failed to login")
        res.status(500).json({msg:"Login failed"})
    }
})

function authenticateToken(req,res,next){
    const authHeader=req.headers["authorization"];
    const token =authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg:"authentication failed"})
    }
    jwt.verify(token, JWT_SECRET, (err,user)=>{
        if(err){
            return res.status(403).json({msg:"invalid token"})
        }
        req.user=user;
        next()
    })
}

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

app.post("/watch", authenticateToken, async (req, res) => {
  const { title, status } = req.body; 
  const userId = req.user.userId;

  try {
    const existingItem = await prisma.watchItem.findFirst({
      where: { title, status, userId }
    });

    if (existingItem) {
      return res.status(400).json({ msg: "Item already exists" });
    }

    await prisma.watchItem.create({
      data: { title, status, userId }
    });
    res.status(200).json({ msg: `Added to ${status.toLowerCase()}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to add item" });
  }
});


app.get("/watchlist", authenticateToken, async (req, res) => {
  try {
    const watchlist = await prisma.watchItem.findMany({
      where: {
        userId: req.user.userId,
        status: "WATCHLIST",
      },
    });
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch watchlist" });
  }
});

app.get("/favourites", authenticateToken, async (req, res) => {
  try {
    const favourites = await prisma.watchItem.findMany({
      where: {
        userId: req.user.userId,
        status: "FAVOURITES",
      },
    });
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch favourites" });
  }
});

app.get("/watched", authenticateToken, async (req, res) => {
  try {
    const watched = await prisma.watchItem.findMany({
      where: {
        userId: req.user.userId,
        status: "WATCHED",
      },
    });
    res.status(200).json(watched);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch watched items" });
  }
});


app.listen(3001, ()=>{
    console.log("server started")
})