import React from 'react';
import { Settings } from 'lucide-react';

const Header = ({ showSettings,onSettingsClick }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div >
        <img className='h-8' src="./assets/logo.svg"/>
      </div>
      <div className="relative">   {/* this line is important */}
        <button 
          onClick={onSettingsClick}
          className="flex items-center gap-2 bg-[hsl(243,27%,20%)] px-4 py-2 rounded-lg hover:bg-[hsla(243,23%,30%,0.5)]    focus:outline-[0.1rem] focus:outline-offset-[0.2rem] transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4 " />
          <span>Units</span>
          <img className={`transition-transform duration-300 ${showSettings ? "rotate-180" : "rotate-0"}`}
          src="./assets/icon-dropdown.svg"/>
        </button>
      </div>

    </div>
  );
};

export default Header;