import GameForm from './components/GameForm/GameForm';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
 
function App() {
  return (
    <div>
      <h1>Create New Game</h1>
      <GameForm />
      <h1>Live Football World Cup Score Board</h1>
      <ScoreBoard />
     </div>
  );
}

export default App;