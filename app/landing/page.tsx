"use client"
import { Clock } from "@/components/Clock"
import { useRouter } from "next/navigation"
import axios from "axios"
function Landing(){
    const router=useRouter()

    async function handleWatchlist(){
        try{
            const response=await axios.get("http://localhost:3001/watchlist")
            if(response){
                console.log("here is your watchlist")
            }
        }
        catch(error){
            console.log("failed to fetch data", error)
        }
    }

    async function handleWatched(){
        try{
            const response=await axios.get("http://localhost:3001/watched")
            if(response){
                console.log("here are your watched movies/tv shows ")
            }
        }
        catch(error){
            console.log("failed to fetch data", error)
        }
    }

    async function handleFavourites(){
        try{
            const response=await axios.get("http://localhost:3001/favourites")
            if(response){
                console.log("here are your favourite movies/tv shows")
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
                <button className="rounded-4xl p-4 bg-black text-white" onClick={()=>{router.push("/")}}> logout </button>
                </div>
            </nav>

            <div className="flex justify-around mt-5">
                <div className="flex gap-1">
                    <button className="bg-lime-400 rounded-2xl p-1 text-lg font-extrabold h-[50px] w-[200px]">Watched</button>
                    <button className="bg-amber-400 rounded-2xl p-1 text-lg font-extrabold h-[50px] w-[200px]"> Watchlist</button>
                    <button className="bg-red-300 rounded-2xl p-1 text-lg font-extrabold h-[50px] w-[200px]">Favoutites</button>
                </div>
                <div>
                     <Clock/>
                </div>
            </div>
            

        </div>
    )

}
export default Landing