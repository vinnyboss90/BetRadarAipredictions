// src/components/ProbabilityBar.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ProbabilityBar = ({ home, draw, away }) => {
  const total = home + draw + away;
  const homeWidth = (home / total) * 100;
  const drawWidth = (draw / total) * 100;
  
  return (
    <div className="flex h-2 w-full rounded-full overflow-hidden bg-gray-200">
      <div 
        style={{ width: `${homeWidth}%`, backgroundColor: "#2563eb" }} 
        className="transition-all duration-500 ease-out"
        title={`Home Win: ${home}%`}
      />
      <div 
        style={{ width: `${drawWidth}%`, backgroundColor: "#6b7280" }} 
        className="transition-all duration-500 ease-out"
        title={`Draw: ${draw}%`}
      />
      <div 
        style={{ width: `${100 - homeWidth - drawWidth}%`, backgroundColor: "#ea580c" }} 
        className="transition-all duration-500 ease-out"
        title={`Away Win: ${away}%`}
      />
    </div>
  );
};

ProbabilityBar.propTypes = {
  home: PropTypes.number.isRequired,
  draw: PropTypes.number.isRequired,
  away: PropTypes.number.isRequired,
};

export default ProbabilityBar;