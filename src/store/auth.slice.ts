import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '../common/types';

export interface AuthState {
  users?: UserEntity[];
  user?: UserEntity;
}

const getInitialState = (): AuthState => ({});

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserEntity[]>) => {
      state.users = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserEntity>) => {
      state.user = action.payload;
    },
  },
});

export const { setProfile, setUsers } = authSlice.actions;

export const authReducer = authSlice.reducer;
