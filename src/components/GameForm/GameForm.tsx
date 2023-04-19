import React, { useState,useRef,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createGame, updateGameScore } from '../../features/games/gamesSlice';

interface GameFormProps {
  gameId?: string;
  homeTeam?: string;
  awayTeam?: string;
}

const GameForm: React.FC<GameFormProps> = ({ gameId, homeTeam = '', awayTeam = '' }) => {
  const [home, setHome] = useState(homeTeam);
  const [away, setAway] = useState(awayTeam);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const formErrorRef = useRef<HTMLParagraphElement | null>(null);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
    const clearValues = () => {
        setHome(''); 
        setAway('');
        setHomeScore(0); 
        setAwayScore(0); 
    }

    const isValidTeamName = (teamName:any) => {
       if (gameId){
        return false ;
       }
        const regex = /^[a-zA-Z0-9_.-]+$/;
        if (!regex.test(teamName)) {
          return true;
        }
        return false;
      };
      useEffect(() => {
        const errorMessage = validateTeamNames(home, away);

        if (errorMessage) {
          setError(errorMessage);
          return;
        }

      }, [home, away]);

      const validateTeamNames = (
        homeTeam: string,
        awayTeam: string
      ): string | null => {

        const regex = /^[a-zA-Z0-9._-]+$/;
        setError("");

        if (home.trim() === "" || away.trim() === "") {
          setError("");
        }else{

            if (homeTeam.length > 50 || awayTeam.length > 50) {
              return "Team names cannot exceed 50 characters.";
            }
          
            if (!regex.test(homeTeam) || !regex.test(awayTeam)) {
              return "Team names can only contain letters, numbers, dot, dash, and underscore.";
            }
          
            if (homeTeam === awayTeam) {
              return "Home and away team names must be different.";
            }
        }
      

      
        return null;
      };
      



    const validateForm = () => {
  
       
      
     


        if (home.trim() === '' || away.trim() === '') {
           return false;
        }
      
        return true;
      };
      
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = validateTeamNames(home, away);

    if (errorMessage) {
    //  setError(errorMessage);
      return;
    }
    
        if (gameId) {
            dispatch(updateGameScore({ id: gameId, homeScore, awayScore }));
          } else {
              dispatch( createGame({ homeTeam:home, awayTeam:away, homeScore, awayScore, }) );
              clearValues();
          }
   


  };

  return (
    <>
   home {JSON.stringify(home)}
  away {JSON.stringify(away)}
    <form onSubmit={handleSubmit}>
      {!gameId && (
        <>
        <p style={{ color: 'red' }}>{error}</p>
          <input
            type="text"
            placeholder="Home Team"
            value={home}
            onChange={(e) => setHome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Away Team"
            value={away}
            onChange={(e) => setAway(e.target.value)}
          />
        </>
      )}
      <input
        type="number"
        min="0"
        placeholder="Home Score"
        value={homeScore}
        onChange={(e) => setHomeScore(parseInt(e.target.value, 10))}
      />
      <input
        type="number"
        min="0"
        placeholder="Away Score"
        value={awayScore}
        onChange={(e) => setAwayScore(parseInt(e.target.value, 10))}
      />
      <button type="submit"  disabled={!validateForm()}>{gameId ? 'Update Score' : 'Create Game'}</button>

    </form>
     </>
  );
};

export default GameForm;
