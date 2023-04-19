import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gamesReducer from '../features/gamesSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['games','finishedGames'],
};

const persistedReducer = persistReducer(persistConfig, gamesReducer);

const store = configureStore({
  reducer: {
    games: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
