import React from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, Server, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <Terminal className="text-emerald-400" size={24} />
            <span>CloudLab</span>
          </NavLink>
          
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `flex items-center gap-1 hover:text-emerald-400 transition duration-200 ${isActive ? 'text-emerald-400' : 'text-gray-300'}`
                  }
                >
                  <Home size={18} />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/instances" 
                  className={({ isActive }) => 
                    `flex items-center gap-1 hover:text-emerald-400 transition duration-200 ${isActive ? 'text-emerald-400' : 'text-gray-300'}`
                  }
                >
                  <Server size={18} />
                  <span>My Instances</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/launch" 
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-md font-medium transition duration-200"
                >
                  Launch VM
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;