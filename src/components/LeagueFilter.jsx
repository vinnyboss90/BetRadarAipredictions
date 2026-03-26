import React from 'react';
import PropTypes from 'prop-types';
import { leagues } from '../data/mockData';

const LeagueFilter = ({ selectedLeague, onLeagueChange, searchTerm, onSearchChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 mb-6 flex flex-wrap items-center justify-between gap-3 border border-gray-100">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => onLeagueChange("all")}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
            selectedLeague === "all" 
              ? "bg-blue-600 text-white shadow-md" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          aria-label="Show all leagues"
        >
          All Leagues
        </button>
        
        {leagues.map(league => (
          <button
            key={league.id}
            onClick={() => onLeagueChange(league.name)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap flex items-center gap-1 ${
              selectedLeague === league.name 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label={`Filter by ${league.name}`}
          >
            <span role="img" aria-label={league.country}>{league.flag}</span>
            <span className="hidden sm:inline">{league.name}</span>
            <span className="sm:hidden">{league.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>
      
      <div className="relative md:hidden w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search team..."
          className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search teams"
        />
        <span className="absolute left-2.5 top-2 text-gray-400 text-sm">🔍</span>
      </div>
    </div>
  );
};

LeagueFilter.propTypes = {
  selectedLeague: PropTypes.string.isRequired,
  onLeagueChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default LeagueFilter;