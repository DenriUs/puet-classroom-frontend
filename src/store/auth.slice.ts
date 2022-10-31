import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '../common/types';

export interface AuthState {
  user?: UserEntity;
}

const getInitialState = (): AuthState => ({});

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserEntity>) => {
      state.user = action.payload;
    },
  },
});

export const { setProfile } = authSlice.actions;

export const authReducer = authSlice.reducer;
