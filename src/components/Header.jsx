import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ activeView, setActiveView }) => {
  const tabs = [
    { id: "predictions", label: "🔮 Predictions", mobileLabel: "Pred" },
    { id: "odds", label: "💰 Odds", mobileLabel: "Odds" },
    { id: "stats", label: "📊 Team Stats", mobileLabel: "Stats" }
  ];
  
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-xl font-black">⚡</span>
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-gray-800">
                Bet<span className="text-blue-700">Radar</span>
              </h1>
              <p className="text-[10px] font-medium text-gray-500 -mt-0.5">AI football predictions</p>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-full shadow-inner">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`px-4 sm:px-6 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  activeView === tab.id 
                    ? 'bg-white text-blue-700 shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                }`}
                aria-label={`Switch to ${tab.label} view`}
              >
                <span>{tab.label.split(' ')[0]}</span>
                <span className="hidden sm:inline">{tab.label.split(' ').slice(1).join(' ')}</span>
                <span className="sm:hidden">{tab.mobileLabel}</span>
              </button>
            ))}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5 gap-2">
              <span className="text-gray-500 text-sm">🔍</span>
              <input 
                type="text" 
                placeholder="Search matches..." 
                className="bg-transparent text-sm outline-none w-36 lg:w-48"
                aria-label="Search matches"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold cursor-pointer shadow-sm hover:scale-105 transition-transform">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  activeView: PropTypes.string.isRequired,
  setActiveView: PropTypes.func.isRequired,
};

export default Header;