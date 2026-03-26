import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import MatchCard from './components/MatchCard';
import LeagueFilter from './components/LeagueFilter';
import { generateMatches } from './data/mockData';

const App = () => {
  const [activeView, setActiveView] = useState("predictions");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const matches = useMemo(() => generateMatches(), []);
  
  const filteredMatches = useMemo(() => {
    let filtered = [...matches];
    
    if (selectedLeague !== "all") {
      filtered = filtered.filter(m => m.leagueName === selectedLeague);
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.homeTeam.toLowerCase().includes(term) || 
        m.awayTeam.toLowerCase().includes(term) ||
        m.leagueName.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [matches, selectedLeague, searchTerm]);
  
  const groupedMatches = useMemo(() => {
    const groups = {};
    filteredMatches.forEach(match => {
      if (!groups[match.leagueName]) groups[match.leagueName] = [];
      groups[match.leagueName].push(match);
    });
    return groups;
  }, [filteredMatches]);
  
  const viewTitles = {
    predictions: { title: "🔮 AI Match Predictions", subtitle: "Based on advanced football algorithms & historical data" },
    odds: { title: "💰 Best Odds & Comparisons", subtitle: "Latest odds from top bookmakers with real-time updates" },
    stats: { title: "📊 Team Statistics & Form", subtitle: "Head-to-head records, form guides & key stats" }
  };
  
  const handleLeagueChange = useCallback((league) => {
    setSelectedLeague(league);
  }, []);
  
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);
  
  const handleClearFilters = useCallback(() => {
    setSelectedLeague("all");
    setSearchTerm("");
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LeagueFilter
          selectedLeague={selectedLeague}
          onLeagueChange={handleLeagueChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {viewTitles[activeView].title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {viewTitles[activeView].subtitle} • Forebet style predictions
          </p>
        </div>
        
        {Object.keys(groupedMatches).length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">⚽</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No matches found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedMatches).map(([leagueName, leagueMatches]) => (
              <div key={leagueName} className="animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{leagueMatches[0]?.leagueFlag || "⚽"}</span>
                  <h3 className="font-bold text-xl text-gray-800">{leagueName}</h3>
                  <span className="text-xs bg-gray-200 px-2.5 py-1 rounded-full text-gray-600 font-medium">
                    {leagueMatches.length} {leagueMatches.length === 1 ? 'match' : 'matches'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {leagueMatches.map(match => (
                    <MatchCard key={match.id} match={match} viewType={activeView} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📈</div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Prediction Accuracy: 74.3%</p>
                <p className="text-sm text-gray-600">
                  Based on Poisson distribution, team form, head-to-head records & historical data
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-xs bg-white/80 px-4 py-2 rounded-full text-blue-700 font-medium shadow-sm">
                ⚡ Updated live
              </div>
              <div className="text-xs bg-white/80 px-4 py-2 rounded-full text-green-700 font-medium shadow-sm">
                🎯 Next update in 5min
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;