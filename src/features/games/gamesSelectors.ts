import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectSortedGames = createSelector(
  (state: RootState) => state.games.games,
  (games) =>
    games.slice().sort((a:any, b:any) => {
      if (a.homeScore + a.awayScore !== b.homeScore + b.awayScore) {
        return b.homeScore + b.awayScore - a.homeScore - a.awayScore;
      }
      return b.createdAt - a.createdAt;
    }),
);

export const selectSortedFinishedGames = createSelector(
  (state: RootState) => state.games.finishedGames,
  (finishedGames) =>
    finishedGames.slice().sort((a:any, b:any) => {
      if (a.homeScore + a.awayScore !== b.homeScore + b.awayScore) {
        return b.homeScore + b.awayScore - a.homeScore - a.awayScore;
      }
      return b.createdAt - a.createdAt;
    }),
);
