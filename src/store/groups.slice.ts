import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupEntity } from '../common/types';

export interface GroupsState {
  groups?: GroupEntity[];
  group?: GroupEntity;
}

const getInitialState = (): GroupsState => ({});

const initialState: GroupsState = getInitialState();

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<GroupEntity[]>) => {
      state.groups = action.payload;
    },
    setGroup: (state, action: PayloadAction<GroupEntity>) => {
      state.group = action.payload;
    },
  },
});

export const { setGroups, setGroup } = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
