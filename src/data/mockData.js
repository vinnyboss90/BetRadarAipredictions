export const leagues = [
  { id: 1, name: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "#3b82f6", bgLight: "bg-blue-50" },
  { id: 2, name: "La Liga", country: "Spain", flag: "🇪🇸", color: "#f97316", bgLight: "bg-orange-50" },
  { id: 3, name: "Serie A", country: "Italy", flag: "🇮🇹", color: "#10b981", bgLight: "bg-emerald-50" },
  { id: 4, name: "Bundesliga", country: "Germany", flag: "🇩🇪", color: "#ef4444", bgLight: "bg-red-50" },
  { id: 5, name: "Ligue 1", country: "France", flag: "🇫🇷", color: "#8b5cf6", bgLight: "bg-violet-50" },
  { id: 6, name: "UEFA Champions League", country: "Europe", flag: "🏆", color: "#f59e0b", bgLight: "bg-amber-50" }
];

export const teamPools = {
  "Premier League": ["Manchester City", "Arsenal", "Liverpool", "Chelsea", "Manchester Utd", "Tottenham", "Newcastle Utd", "Aston Villa", "Brighton"],
  "La Liga": ["Real Madrid", "Barcelona", "Atletico Madrid", "Real Sociedad", "Sevilla", "Athletic Bilbao", "Villarreal"],
  "Serie A": ["Inter Milan", "AC Milan", "Juventus", "Napoli", "Roma", "Lazio", "Atalanta"],
  "Bundesliga": ["Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen", "Eintracht Frankfurt", "Freiburg"],
  "Ligue 1": ["Paris SG", "Marseille", "Monaco", "Lyon", "Lille", "Rennes"],
  "UEFA Champions League": ["Real Madrid", "Bayern Munich", "Manchester City", "Paris SG", "Barcelona", "Inter Milan", "Arsenal", "Borussia Dortmund"]
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateProbs = (homeTeam, awayTeam) => {
  let homeStrength = (homeTeam.length % 7) + rand(3, 6);
  let awayStrength = (awayTeam.length % 7) + rand(2, 5);
  
  const strongKeywords = ["Manchester", "Real", "Bayern", "Liverpool", "Inter", "Arsenal", "Barcelona", "Paris"];
  if (strongKeywords.some(k => homeTeam.includes(k))) homeStrength += 2;
  if (strongKeywords.some(k => awayTeam.includes(k))) awayStrength += 2;
  
  let homeWinProb = rand(28, 55);
  let drawProb = rand(20, 32);
  let awayWinProb = rand(20, 45);
  
  if (homeStrength > awayStrength + 2) {
    homeWinProb += rand(8, 18);
    awayWinProb -= rand(5, 12);
  } else if (awayStrength > homeStrength + 2) {
    awayWinProb += rand(8, 18);
    homeWinProb -= rand(5, 12);
  }
  
  let total = homeWinProb + drawProb + awayWinProb;
  homeWinProb = Math.min(72, Math.max(18, Math.round((homeWinProb / total) * 100)));
  drawProb = Math.min(38, Math.max(18, Math.round((drawProb / total) * 100)));
  awayWinProb = 100 - homeWinProb - drawProb;
  
  if (awayWinProb < 8) {
    awayWinProb = 8;
    homeWinProb -= 2;
    drawProb = 100 - homeWinProb - awayWinProb;
  }
  if (homeWinProb < 12) {
    homeWinProb = 12;
    awayWinProb -= 2;
    drawProb = 100 - homeWinProb - awayWinProb;
  }
  
  return { homeWin: homeWinProb, draw: drawProb, awayWin: awayWinProb };
};

const calcOdds = (homeProb, drawProb, awayProb) => {
  const margin = 1.06;
  return {
    home: (100 / homeProb * margin).toFixed(2),
    draw: (100 / drawProb * margin).toFixed(2),
    away: (100 / awayProb * margin).toFixed(2)
  };
};

export const generateMatches = () => {
  let matches = [];
  let matchId = 1;
  
  leagues.forEach(league => {
    const teamsList = teamPools[league.name] || teamPools["Premier League"];
    const matchCount = league.name === "UEFA Champions League" ? 4 : 6;
    
    for (let i = 0; i < matchCount; i++) {
      let homeIdx = rand(0, teamsList.length - 1);
      let awayIdx = rand(0, teamsList.length - 1);
      while (awayIdx === homeIdx) awayIdx = (awayIdx + 1) % teamsList.length;
      
      const homeTeam = teamsList[homeIdx];
      const awayTeam = teamsList[awayIdx];
      const probs = generateProbs(homeTeam, awayTeam);
      const odds = calcOdds(probs.homeWin, probs.draw, probs.awayWin);
      
      let tip = "1";
      if (probs.draw >= probs.homeWin && probs.draw >= probs.awayWin) tip = "X";
      else if (probs.awayWin > probs.homeWin && probs.awayWin > probs.draw) tip = "2";
      
      const isLive = Math.random() < 0.2;
      const minute = isLive ? `${rand(12, 88)}'` : null;
      const homeScore = isLive ? rand(0, 3) : null;
      const awayScore = isLive ? rand(0, 2) : null;
      
      let dateObj = new Date();
      if (!isLive) {
        const daysOffset = rand(-1, 5);
        dateObj.setDate(dateObj.getDate() + daysOffset);
      }
      const formattedDate = dateObj.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      matches.push({
        id: matchId++,
        leagueId: league.id,
        leagueName: league.name,
        leagueFlag: league.flag,
        leagueColor: league.color,
        leagueBg: league.bgLight,
        homeTeam,
        awayTeam,
        homeProb: probs.homeWin,
        drawProb: probs.draw,
        awayProb: probs.awayWin,
        odds,
        tip,
        date: formattedDate,
        isLive,
        minute,
        homeScore,
        awayScore,
        possession: isLive ? `${rand(40, 60)}%` : null,
        shots: isLive ? `${rand(5, 18)} / ${rand(2, 9)}` : null
      });
    }
  });
  
  matches.sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0));
  return matches;
};