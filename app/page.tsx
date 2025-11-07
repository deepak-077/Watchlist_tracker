"use client"
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const movies =[
  {id:1,title:"Money Heist",img:"money_heist.jpg"},
  {id:2,title:"13 Reasons Why",img:"13 reasons why.jpg"},
  {id:3,title:"Farzi",img:"Farzi.jpeg"},
  {id:4,title:"Breaking Bad",img:"breaking bad.jpg"},
  {id:5,title:"Now You See Me",img:"now you see me.jpg"},
  {id:6,title:"Harry Potter",img:"harry potter.webp"}
]

export default function Home() {
  const [watched,setWatched]=useState([])
  const [favourites,setFavourites]=useState([])
  const [watchlist,setWatchlist]=useState([])

async function addFavourites(title){

  const updatedfavourites= [...favourites,title]
      setFavourites(updatedfavourites)

        try{
            const response=await axios.post("http://localhost:3001/favourites",updatedfavourites )
            if(response.status===200){
                console.log("here are your favourite movies/tv shows",response.data)
            }
        }
        catch(error){
            console.log("failed to fetch data", error)
        }
    }

    async function addWatchlist(title){
      const updatedWatchlist= [...watchlist,title]
      setWatchlist(updatedWatchlist)

      try{
        const response=await axios.post("http://localhost:3001/watchlist",updatedWatchlist)
        if(response.status===200){
          console.log("added to your watchlist")
        }

      }
      catch(error){
        console.log("failed to add",error)
      }
    }

    async function addwatched(title){
      const updatedWatched= [...watched,title]
      setWatched(updatedWatched)

      try{
        const response=await axios.post("http://localhost:3001/watched",updatedWatched)
        if(response.status===200){
          console.log("added to watched")
        }
      }
      catch(error){
        console.log("failed to add",error)
      }
    }

  const router=useRouter();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex bg-red text-black bg-red-400 gap-2 justify-around p-2">
        <h1 className="  text-6xl font-semibold text-center ">Movies Tracker</h1>
        
        <div className="flex gap-2">
          <button className="rounded-4xl p-4 bg-black text-white" onClick={()=>{router.push("/signup")}}> signup </button>
          <button className="rounded-4xl p-4 bg-black text-white" onClick={()=>{router.push("/login")}}> login </button>
        </div>
        
      </div>
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
  );
}
