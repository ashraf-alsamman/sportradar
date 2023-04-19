import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { createSelector } from "reselect";

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  createdAt: number;
}

export interface GamesState {
  games: Game[];
  finishedGames: Game[];
}

const initialState: GamesState = {
  games: [],
  finishedGames: [],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    createGame: (
      state,
      action: PayloadAction<{
        homeTeam: string;
        awayTeam: string;
        homeScore: number;
        awayScore: number;
      }>
    ) => {
      const { homeTeam, awayTeam, homeScore, awayScore } = action.payload;
      const newGame: Game = {
        id: uuidv4(),
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        createdAt: Date.now(),
      };
      state.games.push(newGame);
    },
    updateGameScore: (
      state,
      action: PayloadAction<{
        id: string;
        homeScore: number;
        awayScore: number;
      }>
    ) => {
      const { id, homeScore, awayScore } = action.payload;
      const gameIndex = state.games.findIndex((game) => game.id === id);
      if (gameIndex !== -1) {
        state.games[gameIndex].homeScore = homeScore;
        state.games[gameIndex].awayScore = awayScore;
      }
    },
    finishGame: (state, action: PayloadAction<string>) => {
      const gameId = action.payload;
      const gameIndex = state.games.findIndex((game) => game.id === gameId);
      if (gameIndex !== -1) {
        const finishedGame = state.games[gameIndex];
        state.finishedGames.push(finishedGame);
        state.games.splice(gameIndex, 1);
      }
    },
    deleteFinishedGame: (state, action: PayloadAction<string>) => {
      const gameId = action.payload;
      const gameIndex = state.finishedGames.findIndex(
        (game) => game.id === gameId
      );
      if (gameIndex !== -1) {
        state.finishedGames.splice(gameIndex, 1);
      }
    },
    deleteGame: (state, action: PayloadAction<string>) => {
      const gameId = action.payload;
      const gameIndex = state.games.findIndex((game) => game.id === gameId);
      if (gameIndex !== -1) {
        state.games.splice(gameIndex, 1);
      }
    },
  },
});

export const {
  createGame,
  updateGameScore,
  finishGame,
  deleteFinishedGame,
  deleteGame,
} = gamesSlice.actions;

export default gamesSlice.reducer;
