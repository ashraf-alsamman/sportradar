import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export interface Tournament {
    name: string;
    data: TournamentData[];
  }
  
  interface TournamentsState {
    items: { [key: string]: Tournament };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: TournamentsState = {
    items: {},
    status: 'idle',
    error: null,
  };
  
interface TournamentData {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
}
 
export const fetchTournament = createAsyncThunk(
    'tournaments/fetchTournament',
    async (feedUrl: string) => {
      const response = await axios.get<Tournament>(feedUrl);
      const data = response.data;
      return { feedUrl, data };
    }
  );
 
 
  
  export const tournamentsSlice = createSlice({
    name: 'tournaments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTournament.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTournament.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items[action.payload.feedUrl] = action.payload.data;
        })
        .addCase(fetchTournament.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || null;
        });
    },
  });
  
  export default tournamentsSlice.reducer;
