import React from 'react';
import TruncatedText from './TruncatedText';

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
    <>
      <div className="input-group w-100 p-3 row m-0">

        <div className="input-group w-100 p-3 ">
          <div className=' text-center font-weight-bold  col-lg-12 col-md-12 col-sm-12 col-xs-12  result'>
            <div className='row'>
              <div className='col-5'><TruncatedText text={homeTeam} maxLength={5} /></div>
              <div className='col-2'> vs </div>
              <div className='col-5'><TruncatedText text={awayTeam} maxLength={5} /></div>
            </div>

            <div className='row'>
              <div className='col-5'> {homeScore} </div>
              <div className='col-2'>   </div>
              <div className='col-5'>  {awayScore} </div>
            </div>
          </div>
          <div className='input-group w-100 p-3'>

          <div className="input-group-append"> <span className="input-group-text"> <span className="fas fa-home"></span> </span> </div>
          <input className="form-control" type="number" min="0" max="200" value={newHomeScore}
            onChange={(e) => setNewHomeScore(Number(e.target.value))} />

          <div className="input-group-append"> <span className="input-group-text"> <span className="fas fa-paper-plane"></span> </span> </div>
          <input className="form-control" type="number" min="0" max="200" value={newAwayScore}
            onChange={(e) => setNewAwayScore(Number(e.target.value))}
          />
          </div>
        </div>


        <div className='row input-group w-100 p-1 col-lg-12 col-md-12 col-sm-12 col-xs-12 '>
          <button className="btn btn-outline-secondary btn-sm col m-1" onClick={handleUpdateClick} type="button">
            <span className="mr-1"><span className="fas fa-edit"></span></span>Update
          </button>

          <button className="btn btn-outline-success  btn-sm col m-1" onClick={finishGame} type="button">
            <span className="mr-1"><span className="far fa-thumbs-up"></span></span>Finish
          </button>

          <button className="btn btn-outline-danger btn-sm col m-1" onClick={onDelete} type="button">
            <span className="mr-1"><span className="fab fas fa-trash"></span></span>Delete
          </button>
        </div>

      </div>

    </>
  );
};

export default GameCard;
