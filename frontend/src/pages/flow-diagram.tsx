import React, { useEffect, useState } from 'react'
import FloatingChatbot from '../components/FloatingChatbot'
import Sidebar from '../components/side-bar';
import { Menu } from 'lucide-react';

const FlowDiagram = () => {

  const [activeSidebar, setActiveSidebar] = useState(true);

  const handleSidebar = () => {
      setActiveSidebar(!activeSidebar)
    }



  return (<>
    <div className='relative w-full min-h-screen h-full'>flow-diagram</div>
    <Menu className='absolute size-8 top-3 cursor-pointer text-secondary-pink hover:text-secondary-pink left-2 transition-all duration-300' onClick={handleSidebar} />
    {activeSidebar && <Sidebar isBelow1025={true} activeSidebar={activeSidebar} handleSidebar={handleSidebar}/>}
    <FloatingChatbot />
    </>
  )
}

export default FlowDiagram