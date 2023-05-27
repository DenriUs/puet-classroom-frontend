import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '../common/types';

export interface TeachersState {
  teachers?: UserEntity[];
  teacher?: UserEntity;
}

const getInitialState = (): TeachersState => ({});

const initialState: TeachersState = getInitialState();

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setTeachers: (state, action: PayloadAction<UserEntity[]>) => {
      state.teachers = action.payload;
    },
    createTeachers: (state, action: PayloadAction<UserEntity>) => {
      state.teachers?.push(action.payload);
    },
    updateTeachers: (state, action: PayloadAction<UserEntity>) => {
      state.teacher = action.payload;
      const newUsers = state.teachers?.map((teacher) =>
        teacher.id === action.payload.id ? action.payload : teacher,
      );
      state.teachers = newUsers;
    },
    deleteTeachers: (state, action: PayloadAction<string | undefined>) => {
      state.teachers = state.teachers?.filter((teacher) => teacher.id !== action.payload);
    },
  },
});

export const { setTeachers, createTeachers, updateTeachers, deleteTeachers } =
  teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;
