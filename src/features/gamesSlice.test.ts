import gamesReducer, { createGame, updateGameScore, finishGame, deleteFinishedGame, deleteGame } from './gamesSlice';

describe('games reducer', () => {
  let state:any = { games: [], finishedGames: [] };

  it('should handle initial state', () => {
    expect(gamesReducer(undefined, { type: 'unknown' })).toEqual(state);
  });

  it('should create a game with correct fields', () => {
    const createAction = createGame({
      homeTeam: 'Test Home',
      awayTeam: 'Test Away',
      homeScore: 0,
      awayScore: 0,
    });

    state = gamesReducer(state, createAction);

    const createdGame = state.games[0];

    expect(createdGame.homeTeam).toEqual('Test Home');
    expect(createdGame.awayTeam).toEqual('Test Away');
    expect(createdGame.homeScore).toEqual(0);
    expect(createdGame.awayScore).toEqual(0);
    expect(createdGame.id).toBeTruthy();
    expect(createdGame.createdAt).toBeTruthy();
  });

  it('should update game score', () => {
    const createGameAction = createGame({
      homeTeam: 'Test Home',
      awayTeam: 'Test Away',
      homeScore: 0,
      awayScore: 0,
    });

    const updateAction = updateGameScore({
      id: state.games[0].id,
      homeScore: 2,
      awayScore: 1,
    });

    state = gamesReducer(state, createGameAction);
    state = gamesReducer(state, updateAction);

    const updatedGame = state.games[0];

    expect(updatedGame.homeScore).toEqual(2);
    expect(updatedGame.awayScore).toEqual(1);
  });

  it('should finish a game', () => {
    const createGameAction = createGame({
      homeTeam: 'Test Home',
      awayTeam: 'Test Away',
      homeScore: 0,
      awayScore: 0,
    });

    const finishAction = finishGame(state.games[0].id);

    state = gamesReducer(state, createGameAction);
    state = gamesReducer(state, finishAction);

    expect(state.finishedGames.length).toEqual(1);
  });

  it('should delete a finished game', () => {
    const createGameAction = createGame({
      homeTeam: 'Test Home',
      awayTeam: 'Test Away',
      homeScore: 0,
      awayScore: 0,
    });


    const finishAction = finishGame(state.games[0].id);
    const deleteFinishedAction = deleteFinishedGame(state.games[0].id);

    state = gamesReducer(state, createGameAction);
    state = gamesReducer(state, finishAction);
    state = gamesReducer(state, deleteFinishedAction);

    expect(state.finishedGames.length).toEqual(1);
  });

  it('should delete an unfinished game', () => {
    const createGameAction = createGame({
      homeTeam: 'Test Home',
      awayTeam: 'Test Away',
      homeScore: 0,
      awayScore: 0,
    });

    
    state = gamesReducer(state, createGameAction);
    expect(state.games.length).toEqual(3);
    const deleteAction = deleteGame(state.games[0].id);
    state = gamesReducer(state, deleteAction);
    expect(state.games.length).toEqual(2);
  });
});
