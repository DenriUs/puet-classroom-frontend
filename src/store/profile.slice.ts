import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '../common/types';

export interface ProfileState {
  user?: UserEntity;
}

const getInitialState = (): ProfileState => ({});

const initialState: ProfileState = getInitialState();

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserEntity>) => {
      state.user = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
