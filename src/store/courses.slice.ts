import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CourseActivityEntity, CourseEntity, TopicEntity } from '../common/types';

export interface CoursesState {
  courses?: CourseEntity[];
  course?: CourseEntity;
  courseTopics?: TopicEntity[];
  courseTopicsActivities?: CourseActivityEntity[];
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
    setCourse: (state, action: PayloadAction<CourseEntity>) => {
      state.course = action.payload;
    },
    setCourseTopic: (state, action: PayloadAction<TopicEntity[]>) => {
      state.courseTopics = action.payload;
    },
    setCourseTopicActivities: (state, action: PayloadAction<CourseActivityEntity[]>) => {
      state.courseTopicsActivities = action.payload;
    },
  },
});

export const { setCourses, setCourse, setCourseTopic, setCourseTopicActivities } =
  coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
