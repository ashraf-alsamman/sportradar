import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTournament } from '../features/tournamentsSlice';
import { RootState, AppDispatch } from '../store';
import TruncatedText from './TruncatedText';

interface TournamentProps {
  feedUrl: string;
}

const Tournament: React.FC<TournamentProps> = ({ feedUrl }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  const tournament = useSelector((state: RootState) => state.tournaments.items[feedUrl]);
  const tournamentStatus = useSelector((state: RootState) => state.tournaments.status);
  const error = useSelector((state: RootState) => state.tournaments.error);

  useEffect(() => {
    if (tournamentStatus === 'idle') {
      dispatch(fetchTournament(feedUrl)).finally(() => setLoading(false));
    }
  }, [tournamentStatus, dispatch, feedUrl]);

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  } else if (tournamentStatus === 'succeeded') {
    content = (
      <>
   <div className="mb-4 input-group w-100 p-1 tournament_container">
        <div className='tournament_name'>{tournament?.name}</div>
        {tournament &&
          tournament.data &&
          tournament.data.map((game, index) => (
              <div  key={index} className="input-group w-100  mt-2 ">
                <div className="Resultscoreboard">
                  <div className="row text-center font-weight-bold">
                    <div className="row">
                      <div className="col-5 Resultscoreboard-team-name">
                        <TruncatedText text={game.homeTeam} maxLength={8} />
                      </div>
                      <div className="col-2"> vs </div>
                      <div className="col-5  Resultscoreboard-team-name">
                        <TruncatedText text={game.awayTeam} maxLength={8} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-5 Resultscoreboard-team-score"> {game.homeScore} </div>
                      <div className="col-2"> </div>
                      <div className="col-5 Resultscoreboard-team-score"> {game.awayScore} </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
           
          ))}
          <br />
     </div>
      </>
    );
  } else if (tournamentStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default Tournament;
