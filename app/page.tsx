import Image from "next/image";
const movies =[
  {id:1,title:"Money Heist",img:"money_heist.jpg"},
  {id:2,title:"13 Reasons Why",img:"13 reasons why.jpg"},
  {id:3,title:"Farzi",img:"Farzi.jpeg"},
  {id:4,title:"Breaking Bad",img:"breaking bad.jpg"},
  {id:5,title:"Now You See Me",img:"now you see me.jpg"},
  {id:6,title:"Harry Potter",img:"harry potter.webp"}
]

export default function Home() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex bg-red text-black bg-red-400 gap-2 justify-around p-2">
        <h1 className="  text-6xl font-semibold text-center ">Movies Tracker</h1>
        
        <div className="flex gap-2">
          <button className="rounded-4xl p-4 bg-black text-white"> signup </button>
          <button className="rounded-4xl p-4 bg-black text-white"> login </button>
        </div>
        

      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.map((item,index)=>(
          <div >
            <img className="size-[300px]" src={item.img} alt="" />
            <div className="flex gap-1">
              <button className="bg-lime-400 rounded-2xl p-1 text-sm">Watched</button>
              <button className="bg-amber-400 rounded-2xl p-1 text-sm">Add to watchlist</button>
              <button className="bg-red-300 rounded-2xl p-1 text-sm">Add to favoutites</button>
            </div>
          </div>
          
        ))}
      </div>

      
    </div>
  );
}
