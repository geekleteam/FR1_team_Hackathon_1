import React, { useEffect, useState } from 'react'
import Sidebar from '../side-bar'
import { Outlet, Link } from "react-router-dom";
import { Menu } from 'lucide-react';

const Layout = () => {

  const [activeSidebar, setActiveSidebar] = useState(true);
  const [isBelow1025,setIsBelow1025] = useState(false);


  const handleSidebar = () => {
      setActiveSidebar(!activeSidebar)
    }

  const handleWidth = ()=>{
      if(window.innerWidth >= 1025){
        setIsBelow1025(false);
        setActiveSidebar(true);
      }else{
        setIsBelow1025(true)
        setActiveSidebar(false);
      }
    }


  useEffect(()=>{
      handleWidth()
      if(window){
        window.addEventListener(`resize`,handleWidth)
      }
  
      return ()=>{
        window.removeEventListener(`resize`,handleWidth)
      }
    },[])


  return (
    <>
    <div className='relative w-full flex '>
    <Menu className='absolute size-8 top-3 cursor-pointer text-secondary-pink hover:text-secondary-pink left-2 transition-all duration-300' onClick={handleSidebar} />
    {activeSidebar && <Sidebar isBelow1025={isBelow1025} activeSidebar={activeSidebar} handleSidebar={handleSidebar}/>}
    <section className="bg-white min-h-screen w-full h-full  ml-auto mr-auto flex flex-col gap-20" >
    <Outlet />
    </section>
    </div>  
    </>
  )
}

export default Layout