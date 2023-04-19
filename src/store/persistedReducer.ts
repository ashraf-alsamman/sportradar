import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import gamesReducer from '../features/gamesSlice';

const gamesPersistConfig = {
  key: 'games',
  storage,
};

const persistedReducer = persistReducer(gamesPersistConfig, gamesReducer);

export default persistedReducer;
