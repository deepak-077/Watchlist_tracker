function Login(){
    return(
        <div className="bg-black text-6xl text-white h-screen flex  flex-col justify-center items-center gap-3">
           <h1 className=""> Login Form </h1> 
           <div className="flex flex-col gap-2">
            <input className="border border-amber-500 rounded-2xl p-2 text-3xl" type="text" placeholder="Email" name="email"/>
           <input className="border border-amber-500 rounded-2xl p-2 text-3xl"  type="password" placeholder="Password" name="password"/>
           <button className="bg-lime-300 rounded-4xl p-1 text-3xl">submit</button>
            
           </div>
            
        </div>

    )
}
export default Login
