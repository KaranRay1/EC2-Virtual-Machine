import React from 'react';
import { GithubIcon, Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            <span className="font-bold">CloudLab</span>
          </div>
          
          <div className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} CloudLab. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-slate-400 hover:text-white transition duration-200"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;