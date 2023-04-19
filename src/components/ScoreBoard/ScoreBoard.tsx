import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { updateGameScore, finishGame, deleteFinishedGame,deleteGame } from '../../features/games/gamesSlice';
import { selectSortedGames, selectSortedFinishedGames } from '../../features/games/gamesSelectors';
import { Game } from '../../features/games/gamesSlice';
import GameCard from '../GameCard';

 const ScoreBoard: React.FC = () => {
 
  const dispatch = useDispatch();
  const games = useSelector(selectSortedGames);
  
  const handleFinishGame = (gameId: string) => {
    dispatch(finishGame(gameId));
  };
  const handleScoreUpdate = (gameId: string, homeScore: number, awayScore: number) => {
    dispatch(updateGameScore({ id: gameId, homeScore, awayScore }));
  };
  const handleDeleteGame = (gameId: string) => {
    dispatch(deleteGame(gameId));
  };
  const handleDeleteFinishedGame = (gameId: string) => {
    dispatch(deleteFinishedGame(gameId));
  };
  const finishedGames = useSelector(selectSortedFinishedGames) as Game[];

  return (
    <>
    <div>
    <h2>Current Games</h2>
    {games.map((game, index) => (
        <GameCard
            key={game.id}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            homeScore={game.homeScore}
            awayScore={game.awayScore}
            updateScore={(homeScore, awayScore) => handleScoreUpdate(game.id, homeScore, awayScore)}
            finishGame={() => handleFinishGame(game.id)}
            onDelete={() => handleDeleteGame(game.id)}
         />
    ))}
    
    </div>
    <div>
    <h2>Finished Games</h2>
    {finishedGames.map((game, index) => (
      <div key={game.id}>
        {index + 1}. {game.homeTeam} {game.homeScore} - {game.awayTeam} {game.awayScore}
        <button onClick={() => handleDeleteFinishedGame(game.id)}>Delete</button>
      </div>
    ))}
  </div>
  </>
  );
};

export default ScoreBoard;