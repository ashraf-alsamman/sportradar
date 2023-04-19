import React from 'react';

interface GameCardProps {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    updateScore: (homeScore: number, awayScore: number) => void;
    finishGame?: () => void;
    onDelete?: () => void;
  }

const GameCard: React.FC<GameCardProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  updateScore,
  finishGame,
  onDelete
}) => {
  const [newHomeScore, setNewHomeScore] = React.useState(homeScore);
  const [newAwayScore, setNewAwayScore] = React.useState(awayScore);

  const handleUpdateClick = () => {
    updateScore(newHomeScore, newAwayScore);
  };

  return (
    <div>
      <h3>
        {homeTeam} vs {awayTeam}
      </h3>
      <p>
        {homeScore} - {awayScore}
      </p>
      <input
        type="number"
        value={newHomeScore}
        onChange={(e) => setNewHomeScore(Number(e.target.value))}
      />
      <input
        type="number"
        value={newAwayScore}
        onChange={(e) => setNewAwayScore(Number(e.target.value))}
      />
      <button onClick={handleUpdateClick}>Update</button>
      {finishGame && <button onClick={finishGame}>Finish</button>}
      {onDelete && <button onClick={onDelete}>Delete</button>}   
    </div>
  );
};

export default GameCard;
