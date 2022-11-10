import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CourseActivityEntity,
  CourseActivityTypeEnum,
  CourseEntity,
  TopicEntity,
} from '../common/types';

export interface CoursesState {
  courses?: CourseEntity[];
  course?: CourseEntity;
  courseTopics?: TopicEntity[];
  courseTopic?: TopicEntity;
  courseActivitiesLecture?: CourseActivityEntity[];
  courseActivitiesAssignment?: CourseActivityEntity[];
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
    setCourseTopicActivitiesLecture: (state, action: PayloadAction<CourseActivityEntity[]>) => {
      state.courseActivitiesLecture = action.payload;
    },
    setCourseTopicActivitiesAssignment: (state, action: PayloadAction<CourseActivityEntity[]>) => {
      state.courseActivitiesAssignment = action.payload;
    },
    createCoursesTopicActivity: (state, action: PayloadAction<CourseActivityEntity>) => {
      if (action.payload.type == CourseActivityTypeEnum.LECTURE) {
        state.courseActivitiesLecture?.push(action.payload);
      } else {
        state.courseActivitiesAssignment?.push(action.payload);
      }
    },
  },
});

export const {
  setCourses,
  setCourse,
  createCourses,
  setCourseTopics,
  setCourseTopic,
  setCourseTopicActivitiesLecture,
  setCourseTopicActivitiesAssignment,
  createCoursesTopic,
  createCoursesTopicActivity,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
