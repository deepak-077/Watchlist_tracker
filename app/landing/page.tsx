"use client"
import { Clock } from "@/components/Clock"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from "react"

const movies =[
  {id:1,title:"Money Heist",img:"money_heist.jpg"},
  {id:2,title:"13 Reasons Why",img:"13 reasons why.jpg"},
  {id:3,title:"Farzi",img:"Farzi.jpeg"},
  {id:4,title:"Breaking Bad",img:"breaking bad.jpg"},
  {id:5,title:"Now You See Me",img:"now you see me.jpg"},
  {id:6,title:"Harry Potter",img:"harry potter.webp"}
]

function Landing(){

    const [token, setToken] = useState(null)
    const [list,setList] =useState([]);

    useEffect (() => {
        // Check if we are in the browser before accessing localStorage
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }
    },[])

    async function addFavourites(title){
            try{
                const response=await axios.post("http://localhost:3001/watch",
                    {title, status:"FAVOURITES"},
                    {headers:{Authorization:`Bearer ${token}`}}
                 )
                console.log(response.data.msg)
            }
            catch(error){
                console.log("failed to fetch data", error)
            }
        }
    
        async function addWatchlist(title){
          try{
            const response=await axios.post("http://localhost:3001/watch",
                { title,status: "WATCHLIST" },
                { headers:{Authorization:`Bearer ${token}`}}
            )
            console.log(response.data.msg);
          }
          catch(error){
            console.log("failed to add",error)
          }
        }
    
        async function addwatched(title){
          try{
            const response=await axios.post("http://localhost:3001/watch",
                { title,status: "WATCHED" },
                { headers:{Authorization:`Bearer ${token}`} }
            )
            console.log(response.data.msg);
          }
          catch(error){
            console.log("failed to add",error)
          }
        }
    

    const router=useRouter()


    async function handleWatchlist(){
        try{
            const response=await axios.get("http://localhost:3001/watchlist",{
                headers: { Authorization: `Bearer ${token}` },
            })
            
            if (response.data.length === 0) {
                console.log("No movies in your watchlist.");
            }
            else{
                setList(response.data);
                console.log("your Watchlist is ",response.data)
            }
        }
        catch(error){
            console.log("failed to fetch data", error)
        }
    }

    async function handleWatched(){
        try{
            const response=await axios.get("http://localhost:3001/watched",{
                headers: { Authorization: `Bearer ${token}` },
            })
            if (response.data.length === 0) {
                console.log("No movies in your watchlist.");
            }
            else{
                setList(response.data);
                console.log("your Watchedlist is ",response.data)
            }
            
        }
        catch(error){
            console.log("failed to fetch data", error)
        }
    }

    async function handleFavourites(){
        try{
            const response=await axios.get("http://localhost:3001/favourites",{
                headers: { Authorization: `Bearer ${token}` },
            })
            if (response.data.length === 0) {
                console.log("No movies in your watchlist.");
            }
            else{
                setList(response.data);
                console.log("your favourites list is ",response.data)
            }
        }
        catch(error){
            console.log("failed to fetch data", error)
        }
    }
    return (
        <div className="text-6xl ">

            <nav className="flex bg-red text-black bg-red-400 gap-2 justify-around p-2">
                <div className="flex gap-2">
                <button className="rounded-4xl p-4 bg-black text-white" onClick={()=>{
                    localStorage.removeItem("token")
                    router.push("/")}}> logout </button>
                </div>
            </nav>

            <div className="flex">
                {/* left component */}
                <div className="flex flex-col gap-3">
      
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.map((item,index)=>(
          <div >
            <img className="size-[300px]" src={item.img} alt="" />
            <div className="flex gap-1">
              <button className="bg-lime-400 rounded-2xl p-1 text-sm" onClick={()=>addwatched(item.title)}>Watched</button>
              <button className="bg-amber-400 rounded-2xl p-1 text-sm" onClick={()=>addWatchlist(item.title)}>Add to watchlist</button>
              <button className="bg-red-300 rounded-2xl p-1 text-sm" onClick={()=>addFavourites(item.title)}>Add to favoutites</button>
            </div>
          </div>
        ))}
      </div>

    </div>

                {/* right component */}
                <div className="flex flex-col gap-3 mt-3 items-center">
                    <div className="flex gap-1">
                        <button className="bg-lime-400 rounded-2xl p-1 text-lg font-extrabold h-[50px] w-[200px]" onClick={handleWatched}>Watched</button>
                        <button className="bg-amber-400 rounded-2xl p-1 text-lg font-extrabold h-[50px] w-[200px]" onClick={handleWatchlist}> Watchlist</button>
                        <button className="bg-red-300 rounded-2xl p-1 text-lg font-extrabold h-[50px] w-[200px]" onClick={handleFavourites}>Favoutites</button>
                    </div>
                    <div>
                        <Clock/>
                    </div>
                    <div>{ list.length> 0 ? (list.map((item,index) => (
                        <div>
                            <div>{item.status}</div>
                            <div>{item.title}</div>
                            
                        </div>
                    ))):(
                        <div> list is empty </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Landing