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
    createGroups: (state, action: PayloadAction<GroupEntity>) => {
      state.groups?.push(action.payload);
    },
    updateGroups: (state, action: PayloadAction<GroupEntity>) => {
      state.group = action.payload;
      const newSpecialities = state.groups?.map((group) =>
        group.id === action.payload.id ? action.payload : group,
      );
      state.groups = newSpecialities;
    },
    deleteGroups: (state, action: PayloadAction<string | undefined>) => {
      state.groups = state.groups?.filter((group) => group.id !== action.payload);
    },
  },
});

export const { setGroups, setGroup, createGroups, updateGroups, deleteGroups } =
  groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
