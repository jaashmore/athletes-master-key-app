// src/components/Header.jsx
import React from 'react';
const Header = ({ currentWeek }) => (
    <header className="w-full max-w-4xl mx-auto p-4 sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg">
        <div className="text-center mb-2"><h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400">Athlete's Master Key</h1></div>
        <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-gradient-to-r from-teal-400 to-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(currentWeek / 8) * 100}%` }}></div></div>
        <p className="text-center text-sky-300 mt-2 text-sm font-semibold">Week {currentWeek} of 8</p>
    </header>
);
export default Header;
