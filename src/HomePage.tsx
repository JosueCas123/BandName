import { useContext, useEffect, useState } from "react";
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import { SocketContext } from "./context/SocketContext";
import { BandChart } from "./components/BandChart";


 const HomePage = () => {

  const {online} = useContext(SocketContext);

  return (
   <div className=" w-10/12 m-0 m-auto">
        <div className="">
          <p className=" font-semibold">
            Service status:
            {
              online 
                ?<span className=" ml-3 text-green-400">Online</span>
                :<span className=" ml-3 text-red-400">Offline</span>
            }
            
           
          </p>
        </div>

        <h1 className=" text-2xl">BandNames</h1>
        <hr />

        <div className="flex justify-center items-center w-full">
          <BandChart/>
        </div>

        <div className="flex mt-5 space-x-5">
          <div className=" w-3/5">
            <BandList/>
          </div>
          <div className=" w-2/5">
            <BandAdd/>
          </div>
        </div>
   </div>
  )
}

export default HomePage;