import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProbabilityBar from './ProbabilityBar';

const MatchCard = ({ match, viewType }) => {
  const [showOdds, setShowOdds] = useState(false);
  
  const tipBadgeClass = match.tip === '1' 
    ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
    : match.tip === 'X' 
    ? 'bg-amber-100 text-amber-800 border-amber-200' 
    : 'bg-rose-100 text-rose-800 border-rose-200';
  
  const tipIcon = match.tip === '1' ? '🏠' : match.tip === 'X' ? '🤝' : '✈️';
  
  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 overflow-hidden animate-slide-up">
      {/* League & Status Header */}
      <div className={`px-4 py-2.5 flex justify-between items-center border-b ${match.leagueBg || 'bg-gray-50'} border-gray-100`}>
        <div className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label="league flag">{match.leagueFlag}</span>
          <span className="font-semibold text-sm text-gray-700">{match.leagueName}</span>
          <span className="text-xs text-gray-500 hidden sm:inline">{match.date}</span>
        </div>
        
        {match.isLive ? (
          <div className="flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE {match.minute}
          </div>
        ) : (
          <span className="text-xs text-gray-500 bg-white/60 px-2 py-0.5 rounded-full">{match.date}</span>
        )}
      </div>
      
      {/* Teams & Score */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 text-right">
            <div className="font-bold text-gray-800 text-base sm:text-lg">{match.homeTeam}</div>
            {match.isLive && <div className="text-2xl font-black text-gray-900">{match.homeScore}</div>}
          </div>
          
          <div className="flex flex-col items-center justify-center bg-gray-100 w-10 h-10 rounded-full">
            <span className="text-xs font-black text-gray-600">VS</span>
          </div>
          
          <div className="flex-1">
            <div className="font-bold text-gray-800 text-base sm:text-lg">{match.awayTeam}</div>
            {match.isLive && <div className="text-2xl font-black text-gray-900">{match.awayScore}</div>}
          </div>
        </div>
        
        {/* Prediction Content */}
        {viewType !== 'stats' && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-blue-700">🏠 {match.homeProb}%</span>
              <span className="text-gray-600">🤝 {match.drawProb}%</span>
              <span className="text-orange-700">✈️ {match.awayProb}%</span>
            </div>
            
            <ProbabilityBar home={match.homeProb} draw={match.drawProb} away={match.awayProb} />
            
            <div className="flex items-center justify-between mt-2">
              <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${tipBadgeClass}`}>
                <span>{tipIcon}</span>
                <span>Tip: {match.tip}</span>
              </div>
              
              {viewType === 'odds' && (
                <button 
                  onClick={() => setShowOdds(!showOdds)} 
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full font-medium text-gray-700 transition-all hover:scale-105 active:scale-95"
                >
                  {showOdds ? "Hide odds" : "Show odds"}
                </button>
              )}
            </div>
            
            {viewType === 'odds' && showOdds && (
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-dashed border-gray-200 animate-slide-up">
                <div className="bg-blue-50 rounded-xl p-2 text-center hover:bg-blue-100 transition cursor-pointer odds-button">
                  <div className="text-[10px] text-blue-700 font-semibold">1</div>
                  <div className="font-black text-blue-800 text-sm">{match.odds.home}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-2 text-center hover:bg-gray-100 transition cursor-pointer odds-button">
                  <div className="text-[10px] text-gray-600 font-semibold">X</div>
                  <div className="font-black text-gray-800 text-sm">{match.odds.draw}</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-2 text-center hover:bg-orange-100 transition cursor-pointer odds-button">
                  <div className="text-[10px] text-orange-700 font-semibold">2</div>
                  <div className="font-black text-orange-800 text-sm">{match.odds.away}</div>
                </div>
              </div>
            )}
            
            {viewType === 'predictions' && (
              <div className="grid grid-cols-3 gap-1 mt-1 text-center text-[11px] font-semibold">
                <div className="bg-blue-100/50 rounded py-1 text-blue-800">
                  1X: {match.homeProb + match.drawProb}%
                </div>
                <div className="bg-gray-100/50 rounded py-1 text-gray-700">
                  X2: {match.drawProb + match.awayProb}%
                </div>
                <div className="bg-orange-100/50 rounded py-1 text-orange-800">
                  12: {match.homeProb + match.awayProb}%
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Stats View */}
        {viewType === 'stats' && (
          <div className="mt-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">⚽ Form (last 5)</span>
              <span className="text-xs text-gray-500">Home: W-D-L-W-W &nbsp; Away: L-W-D-L-D</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
              <span>🎯 Avg Goals: 1.8</span>
              <span>🧤 Clean Sheets: 42%</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>🔥 BTTS Probability: 58%</span>
              <span>📊 Over 2.5: 52%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

MatchCard.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.number.isRequired,
    leagueName: PropTypes.string.isRequired,
    leagueFlag: PropTypes.string.isRequired,
    leagueBg: PropTypes.string,
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    homeProb: PropTypes.number.isRequired,
    drawProb: PropTypes.number.isRequired,
    awayProb: PropTypes.number.isRequired,
    odds: PropTypes.object.isRequired,
    tip: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isLive: PropTypes.bool.isRequired,
    minute: PropTypes.string,
    homeScore: PropTypes.number,
    awayScore: PropTypes.number,
  }).isRequired,
  viewType: PropTypes.string.isRequired,
};

export default MatchCard;