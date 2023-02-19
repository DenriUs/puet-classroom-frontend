import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CourseActivityEntity,
  CourseEntity,
  CourseParticipantEntity,
  TopicEntity,
} from '../common/types';

export interface CoursesState {
  courses?: CourseEntity[];
  course?: CourseEntity;
  courseTopics?: TopicEntity[];
  courseTopic?: TopicEntity;
  courseActivities?: CourseActivityEntity[];
  courseParticipants?: CourseParticipantEntity[];
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
    deleteCourses: (state, action: PayloadAction<string | undefined>) => {
      const newCourses = state.courses?.filter((course) => course.id !== action.payload);
      state.courses = newCourses;
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
    deleteCourseTopic: (state, action: PayloadAction<string | undefined>) => {
      const newTopics = state.courseTopics?.filter(
        (paticipant) => paticipant.id !== action.payload,
      );
      state.courseTopics = newTopics;
    },
    setCourseTopicActivities: (state, action: PayloadAction<CourseActivityEntity[]>) => {
      state.courseActivities = action.payload;
    },
    createCoursesTopicActivity: (state, action: PayloadAction<CourseActivityEntity>) => {
      state.courseActivities?.push(action.payload);
    },
    deleteCourseActivity: (state, action: PayloadAction<CourseActivityEntity>) => {
      const newLectures = state.courseActivities?.filter(
        (activity) => activity.id !== action.payload.id,
      );
      state.courseActivities = newLectures;
    },
    setCoursesParticipants: (state, action: PayloadAction<CourseParticipantEntity[]>) => {
      state.courseParticipants = action.payload;
    },
    createCoursesParticipant: (state, action: PayloadAction<CourseParticipantEntity>) => {
      state.courseParticipants?.push(action.payload);
    },
    deleteCourseParticipant: (state, action: PayloadAction<string | undefined>) => {
      const newParticipants = state.courseParticipants?.filter(
        (paticipant) => paticipant.id !== action.payload,
      );
      state.courseParticipants = newParticipants;
    },
    resetCourse: () => {
      return initialState;
    },
  },
});

export const {
  setCourses,
  setCourse,
  createCourses,
  deleteCourses,
  setCourseTopics,
  setCourseTopic,
  setCourseTopicActivities,
  deleteCourseActivity,
  createCoursesTopic,
  deleteCourseTopic,
  createCoursesTopicActivity,
  setCoursesParticipants,
  createCoursesParticipant,
  deleteCourseParticipant,
  resetCourse,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
