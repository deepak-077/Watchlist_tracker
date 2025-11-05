"use client"
import { useState } from "react"
import axios from "axios"

function Login(){
    const [credentials,setCredentials]=useState({
        email:"",
        password:"",
    })

    function handleChange(e){
        setCredentials((prev)=>({
            ...prev, [e.target.name]:e.target.value
        }))
    }

    async function handleLogin(){
        try{
            const res = await axios.post("http://localhost:3000/login",credentials)
            if(res.status===200) {
                console.log("login succesfull")
            }

        }
        catch(error){
            console.log("failed to login",error)
        }
    }

    return(
        <div className="bg-black text-6xl text-white h-screen flex  flex-col justify-center items-center gap-3">
           <h1 className=""> Login Form </h1> 
           <div className="flex flex-col gap-2">
            <input className="border border-amber-500 rounded-2xl p-2 text-3xl" type="text" placeholder="Email" name="email" onChange={handleChange}/>
           <input className="border border-amber-500 rounded-2xl p-2 text-3xl"  type="password" placeholder="Password" name="password" onChange={handleChange}/>
           <button className="bg-lime-300 rounded-4xl p-1 text-3xl">submit</button>
            
           </div>
            
        </div>

    )
}
export default Login
