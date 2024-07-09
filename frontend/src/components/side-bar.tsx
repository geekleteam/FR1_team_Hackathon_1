import React from 'react';

import { Link } from 'react-router-dom';
const UserSVG = () => (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#4B5563" />
        <path d="M24 25C28.4183 25 32 21.4183 32 17C32 12.5817 28.4183 9 24 9C19.5817 9 16 12.5817 16 17C16 21.4183 19.5817 25 24 25Z" fill="#E5E7EB" />
        <path d="M36 39C36 32.3726 30.6274 27 24 27C17.3726 27 12 32.3726 12 39" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
    </svg>
);
function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white">
            <div className="p-4 flex items-center space-x-4">
                <UserSVG />
                <div>
                    <h2 className="font-semibold">David Williams</h2>
                    <p className="text-sm text-gray-400">Product Owner</p>
                </div>
            </div>
            <nav role="navigation">
                <ul className="list-none p-0 mt-10">
                    <li className="mb-4"><Link to="/">Chat</Link></li>
                    <li className="mb-4"><Link to="/table">Comparision</Link></li>
                </ul>
            </nav>
        </div>

    );
}

export default Sidebar;