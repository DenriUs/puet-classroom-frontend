import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '../common/types';

export interface StudentsState {
  students?: UserEntity[];
  student?: UserEntity;
}

const getInitialState = (): StudentsState => ({});

const initialState: StudentsState = getInitialState();

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<UserEntity[]>) => {
      state.students = action.payload;
    },
    setStudent: (state, action: PayloadAction<UserEntity>) => {
      state.student = action.payload;
    },
    createStudents: (state, action: PayloadAction<UserEntity>) => {
      state.students?.push(action.payload);
    },
    updateStudents: (state, action: PayloadAction<UserEntity>) => {
      state.student = action.payload;
      const newUsers = state.students?.map((student) =>
        student.id === action.payload.id ? action.payload : student,
      );
      state.students = newUsers;
    },
    deleteStudents: (state, action: PayloadAction<string | undefined>) => {
      state.students = state.students?.filter((student) => student.id !== action.payload);
    },
  },
});

export const { setStudents, setStudent, createStudents, updateStudents, deleteStudents } =
  studentsSlice.actions;

export const studentsReducer = studentsSlice.reducer;
