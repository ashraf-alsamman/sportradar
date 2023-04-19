import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createGame, updateGameScore } from "../features/gamesSlice";

interface GameFormProps {
  gameId?: string;
  homeTeam?: string;
  awayTeam?: string;
}

const GameForm: React.FC<GameFormProps> = ({
  gameId,
  homeTeam = "",
  awayTeam = "",
}) => {
  const [home, setHome] = useState(homeTeam);
  const [away, setAway] = useState(awayTeam);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [validateForm, setValidateForm] = useState(false);

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const clearValues = () => {
    setHome("");
    setAway("");
    setHomeScore(0);
    setAwayScore(0);
  };

 
  useEffect(() => {
    const errorMessage = validateTeamNames(home, away);

    if (errorMessage) {
      setValidateForm(false);
      setError(errorMessage);
      return;
    }else{
      setValidateForm(true);
    }

    if (home.trim() === "" || away.trim() === "") {
      setValidateForm(false);
    }else{
      setValidateForm(true);
    }
// eslint-disable-next-line
  }, [home, away]);

  const validateTeamNames = (
    homeTeam: string,
    awayTeam: string
  ): string | null => {
    const regex = /^[a-zA-Z0-9._-]+$/;
    setError("");

    if (home.trim() === "" || away.trim() === "") {
      setError("");
    } else {
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



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    if (gameId) {
      dispatch(updateGameScore({ id: gameId, homeScore, awayScore }));
    } else {
      dispatch(
        createGame({ homeTeam: home, awayTeam: away, homeScore, awayScore })
      );
      clearValues();
    }
  };

  return (
    <>
      {error !== "" && (
        <div
          className="w-100 p-3 alert alert-danger shadow-soft mb-4 mb-lg-2 mb-md-2 mb-sm-2 mb-xs-2 animated-element"
          role="alert"
        > 
          <span className="alert-inner--icon icon-sm">
            <span className="fas fa-fire"></span>
          </span>
          <span className="alert-heading">Error!</span> <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        
          <>
            <div className="input-group mb-4 w-100 p-3 ">

              <div className="input-group mb-4 w-50 p-3 ">
                <input className="form-control" placeholder="Home Team" value={home} onChange={(e) => setHome(e.target.value)} id="exampleInputIcon2" aria-label="Input group" type="text" />
                <div className="input-group-append"> <span className="input-group-text"> <span className="fas fa-home"></span> </span> </div>

                <input className="form-control" type="number" min="0" max="200" placeholder="Home Score"
                  value={homeScore} onChange={(e) => setHomeScore(parseInt(e.target.value, 10))} />
              </div>


              <div className="input-group mb-4 w-50 p-3 ">
                <input className="form-control" placeholder="Away Team" value={away} onChange={(e) => setAway(e.target.value)} id="exampleInputIcon2" aria-label="Input group" type="text" />
                <div className="input-group-append"> <span className="input-group-text"> <span className="fas fa-paper-plane"></span> </span> </div>

                <input className="form-control" type="number" min="0" max="200" placeholder="Away Score"
                  value={awayScore} onChange={(e) => setAwayScore(parseInt(e.target.value, 10))} />
              </div>
              <button className="btn btn-block animate-up-2" type="submit" disabled={!validateForm}>
                <span className="mr-1"> <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M18,7 L20.5,7 C20.7761424,7 21,7.22385763 21,7.5 C21,7.77614237 20.7761424,8 20.5,8 L18,8 L18,10.5 C18,10.7761424 17.7761424,11 17.5,11 C17.2238576,11 17,10.7761424 17,10.5 L17,8 L14.5,8 C14.2238576,8 14,7.77614237 14,7.5 C14,7.22385763 14.2238576,7 14.5,7 L17,7 L17,4.5 C17,4.22385763 17.2238576,4 17.5,4 C17.7761424,4 18,4.22385763 18,4.5 L18,7 Z M11.5,7 C11.7761424,7 12,7.22385763 12,7.5 C12,7.77614237 11.7761424,8 11.5,8 L3.5,8 C3.22385763,8 3,7.77614237 3,7.5 C3,7.22385763 3.22385763,7 3.5,7 L11.5,7 Z M14.5,12 C14.7761424,12 15,12.2238576 15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L3.5,13 C3.22385763,13 3,12.7761424 3,12.5 C3,12.2238576 3.22385763,12 3.5,12 L14.5,12 Z M20.5,17 C20.7761424,17 21,17.2238576 21,17.5 C21,17.7761424 20.7761424,18 20.5,18 L3.5,18 C3.22385763,18 3,17.7761424 3,17.5 C3,17.2238576 3.22385763,17 3.5,17 L20.5,17 Z" />
                </svg> </span> New Game  
              </button>

            </div>


          </>
      

      </form>
    </>
  );
};

export default GameForm;
