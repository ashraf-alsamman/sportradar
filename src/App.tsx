import React, { useState } from 'react';
import GameForm from './components/GameForm';
import ScoreBoard from './components/ScoreBoard';
import Results from './components/Results';

function App() {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggle = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="container">
      <br />
      <h2 className='font-weight-bold'>Sportradar Task V2  New task </h2> 
      <Results/>
      <br />

      <button onClick={handleToggle}>{isHidden ? 'Show' : 'Hide'} Old Task Content</button>
      {isHidden ? null : (
        <>
          <h5 className='font-weight-bold'>Sportradar Task V1  Old task </h5> 
          <h6 className='font-weight-bold'>Create New Game</h6>
          <GameForm />
          <ScoreBoard />
        </>
      )} <br /> <br />

    </div>
  );
}

export default App;
