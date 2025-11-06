"use client"

import { useState } from "react"
import axios from "axios"

function Signup(){
    const [details,setDetails] =useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
    })

    function handleChange(e){
        setDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    async function handleSubmit(){
        try{
            const res= await axios.post("http://localhost:3001/signup",details)
            if(res.status===201){
                return console.log("signup successfull")
            }
        }
        catch(error){
            console.log("failed to signup", error)
        }
    }


    return(
        <div className="bg-black text-6xl text-white h-screen flex  flex-col justify-center items-center gap-3">
           <h1 className=""> Signup Form </h1> 
           <div className="flex flex-col gap-2">
            <input className="border border-amber-500 rounded-2xl p-2 text-3xl" type="text" placeholder="Firstname" name="firstname" onChange={handleChange}/>
           <input className="border border-amber-500 rounded-2xl p-2 text-3xl"  type="text" placeholder="Lastname" name="lastname" onChange={handleChange}/>
           
            <input className="border border-amber-500 rounded-2xl p-2 text-3xl" type="text" placeholder="Email" name="email" onChange={handleChange}/>
           <input className="border border-amber-500 rounded-2xl p-2 text-3xl"  type="password" placeholder="Password" name="password" onChange={handleChange}/>
           <button className="bg-lime-300 rounded-4xl p-1 text-3xl" onClick={handleSubmit}>submit</button>
            
           </div>
            
        </div>


    )
}
export default Signup
