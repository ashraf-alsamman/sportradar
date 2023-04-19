import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGameScore, finishGame, deleteFinishedGame, deleteGame } from '../features/gamesSlice';
import { selectSortedGames, selectSortedFinishedGames } from '../features/gamesSelectors';
import { Game } from '../features/gamesSlice';
import GameCard from './GameCard';
import TruncatedText from './TruncatedText';

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
      <hr />

      <div className='row'>
        <div className='col'>
          <h6 className='font-weight-bold'>Ongoing Matches</h6>

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
        <div className='col'>

          <h6 className='font-weight-bold'>Summary (finished matches)</h6>
          {finishedGames.map((game, index) => (
            <div key={game.id}>
              <div className="input-group w-100 p-3">
                <div className="scoreboard">
                  <div className='row text-center font-weight-bold  '>
                    <div className='row'>
                      <div className='col-5 scoreboard-team-name'><TruncatedText text={game.homeTeam} maxLength={5} /></div>
                      <div className='col-2'> vs </div>
                      <div className='col-5  scoreboard-team-name'><TruncatedText text={game.awayTeam} maxLength={5} /></div>
                    </div>

                    <div className='row'>
                      <div className='col-5 scoreboard-team-score'> {game.homeScore} </div>
                      <div className='col-2'>   </div>
                      <div className='col-5 scoreboard-team-score'> {game.awayScore} </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-outline-danger btn-sm col" onClick={() => handleDeleteFinishedGame(game.id)} type="button">
                <span className="mr-1"><span className="fab fas fa-trash"></span></span>Delete
              </button>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;