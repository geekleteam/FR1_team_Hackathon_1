import React from 'react';
import { CircleX } from 'lucide-react';

interface SidebarProps {
  isBelow1025: boolean;
  activeSidebar: boolean;
  handleSidebar: any;
}

import { Link } from 'react-router-dom';

const Sidebar: React.FC<SidebarProps> = ({ isBelow1025, activeSidebar, handleSidebar }) => {
  return (
    <>
      <div
        className={`${isBelow1025 ? ` fixed ` : ` sticky `} z-[9] overflow-hidden top-0 w-[230px] pl-4 flex flex-col gap-6 bg-bg-dark text-white transition-all duration-[0.3s] ease-in-out overflow-y-auto border-r-[1px]
        ${activeSidebar ? 'w-auto min-w-[230px] min-h-screen h-fit max-h-screen ' : 'w-0 h-0'}
        `}
      >
        <div className="relative min-w-[225px] h-auto">
          {isBelow1025 && (
            <CircleX
              onClick={handleSidebar}
              className="text-xl absolute top-3 right-6  text-secondary-pink hover:text-secondary-purple cursor-pointer"
            />
          )}
        </div>
        {activeSidebar && <img className="w-[160px] h-[60px]" src={`/logo.png`} />}
        <nav role="navigation" className="w-[60%] ">
          {activeSidebar && (
            <>
              <ul className="list-none p-1">
                {/* <li className="mb-4"><Link to="/dashboard">Chatbot</Link></li> */}
                <Link to="/dashboard">
                  <li className="mb-4 text-secondary-pink border-[1px] hover:bg-secondary-pink hover:text-white border-secondary-pink rounded-md p-1">
                    Create New
                  </li>
                </Link>
                <li className="mb-4 hover:text-secondary-pink  cursor-pointer  rounded-md p-1">
                  <input type="file" />
                </li>
                {/* <li className="mb-4"><Link to="/dashboard/table">Comparision</Link></li> */}
                {/* <li className="mb-4"><Link to="/dashboard/chatbot">Chat</Link></li> */}
              </ul>
              <ul>
                <li className="mb-4 text-secondary-pink underline hover:text-white rounded-md p-1">
                  <Link to="/dashboard">Download File</Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
