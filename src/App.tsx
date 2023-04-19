import GameForm from './components/GameForm';
import ScoreBoard from './components/ScoreBoard';

function App() {
  return (
    <div className="container">
      <br />
      <h5 className='font-weight-bold'>Sportradar Task</h5><hr />
      <h6 className='font-weight-bold'>Create New Game</h6>
      <GameForm />
      <ScoreBoard />
      <hr />
    </div>
  );
}

export default App;