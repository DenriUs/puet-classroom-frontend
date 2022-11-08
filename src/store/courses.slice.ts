import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CourseActivityEntity, CourseEntity, TopicEntity } from '../common/types';

export interface CoursesState {
  courses?: CourseEntity[];
  course?: CourseEntity;
  courseTopics?: TopicEntity[];
  courseTopic?: TopicEntity;
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
    createCourses: (state, action: PayloadAction<CourseEntity>) => {
      state.courses?.push(action.payload);
    },
    setCourseTopics: (state, action: PayloadAction<TopicEntity[]>) => {
      state.courseTopics = action.payload;
    },
    setCourseTopic: (state, action: PayloadAction<TopicEntity>) => {
      state.courseTopic = action.payload;
    },
    createCoursesTopic: (state, action: PayloadAction<TopicEntity>) => {
      state.courseTopics?.push(action.payload);
    },
    setCourseTopicActivities: (state, action: PayloadAction<CourseActivityEntity[]>) => {
      state.courseTopicsActivities = action.payload;
    },
    createCoursesTopicActivity: (state, action: PayloadAction<CourseActivityEntity>) => {
      state.courseTopicsActivities?.push(action.payload);
    },
  },
});

export const {
  setCourses,
  setCourse,
  createCourses,
  setCourseTopics,
  setCourseTopic,
  setCourseTopicActivities,
  createCoursesTopic,
  createCoursesTopicActivity,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
