import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gamesReducer from '../features/gamesSlice';
import tournamentsReducer from '../features/tournamentsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['games','finishedGames'],
};

const persistedReducer = persistReducer(persistConfig, gamesReducer);

const store = configureStore({
  reducer: {
    games: persistedReducer,
    tournaments: tournamentsReducer,
  },
});

 
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
