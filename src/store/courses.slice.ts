import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CourseEntity, TopicEntity } from '../common/types';

export interface CoursesState {
  courses?: CourseEntity[];
  course?: CourseEntity;
  courseTopics?: TopicEntity[];
}

const getInitialState = (): CoursesState => ({});

const initialState: CoursesState = getInitialState();

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseEntity[]>) => {
      console.log(action.payload);
      state.courses = action.payload;
    },
    setCourse: (state, action: PayloadAction<CourseEntity>) => {
      state.course = action.payload;
    },
    setCourseTopic: (state, action: PayloadAction<TopicEntity[]>) => {
      state.courseTopics = action.payload;
    },
  },
});

export const { setCourses, setCourse, setCourseTopic } = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
