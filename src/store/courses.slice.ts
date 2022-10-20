import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CourseEntity } from '../common/types';

export interface CoursesState {
  courses?: CourseEntity[];
}

const getInitialState = (): CoursesState => ({});

const initialState: CoursesState = getInitialState();

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseEntity[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses } = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
