import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CourseActivityEntity,
  CourseEntity,
  CourseParticipantEntity,
  CoursePassedAssignmentEntity,
  CourseTopicEntity,
} from '../common/types';

export interface CoursesState {
  courses?: CourseEntity[];
  course?: CourseEntity;
  courseTopics?: CourseTopicEntity[];
  courseTopic?: CourseTopicEntity;
  courseActivities?: CourseActivityEntity[];
  courseActivity?: CourseActivityEntity;
  courseGradeBook?: CoursePassedAssignmentEntity[];
  coursePassedAssignments?: CoursePassedAssignmentEntity[];
  coursePassedAssignment?: CoursePassedAssignmentEntity;
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
    updateCourses: (state, action: PayloadAction<CourseEntity>) => {
      state.course = action.payload;
    },
    deleteCourses: (state, action: PayloadAction<string | undefined>) => {
      state.courses = state.courses?.filter((course) => course.id !== action.payload);
    },
    setCourseTopics: (state, action: PayloadAction<CourseTopicEntity[]>) => {
      state.courseTopics = action.payload;
    },
    setCourseTopic: (state, action: PayloadAction<CourseTopicEntity>) => {
      state.courseTopic = action.payload;
    },
    createCoursesTopic: (state, action: PayloadAction<CourseTopicEntity>) => {
      state.courseTopics?.push(action.payload);
    },
    updateCourseTopic: (state, action: PayloadAction<CourseTopicEntity>) => {
      const newTopics = state.courseTopics?.map((topic) =>
        topic.id === action.payload.id ? action.payload : topic,
      );
      state.courseTopics = newTopics;
    },
    deleteCourseTopic: (state, action: PayloadAction<string | undefined>) => {
      state.courseTopics = state.courseTopics?.filter(
        (paticipant) => paticipant.id !== action.payload,
      );
      state.courseActivities = undefined;
    },
    setCourseTopicActivities: (state, action: PayloadAction<CourseActivityEntity[]>) => {
      action.payload.sort((a, b) => (a.type < b.type ? 1 : -1));
      state.courseActivities = action.payload;
    },
    setCourseTopicActivity: (state, action: PayloadAction<CourseActivityEntity>) => {
      state.courseActivity = action.payload;
    },
    createCoursesTopicActivity: (state, action: PayloadAction<CourseActivityEntity>) => {
      state.courseActivities?.push(action.payload);
    },
    updateCoursesTopicActivity: (state, action: PayloadAction<CourseActivityEntity>) => {
      const newActivities = state.courseActivities?.map((activity) =>
        activity.id === action.payload.id ? action.payload : activity,
      );
      state.courseActivities = newActivities;
    },
    deleteCourseActivity: (state, action: PayloadAction<CourseActivityEntity>) => {
      state.courseActivities = state.courseActivities?.filter(
        (activity) => activity.id !== action.payload.id,
      );
    },
    setPassedAssignments: (state, action: PayloadAction<CoursePassedAssignmentEntity[]>) => {
      state.coursePassedAssignments = action.payload;
    },
    setPassedAssignment: (state, action: PayloadAction<CoursePassedAssignmentEntity>) => {
      state.coursePassedAssignment = action.payload;
    },
    setGradeBooks: (state, action: PayloadAction<CoursePassedAssignmentEntity[]>) => {
      state.courseGradeBook = action.payload;
    },
    createPassedAssignments: (state, action: PayloadAction<CoursePassedAssignmentEntity>) => {
      state.coursePassedAssignment = action.payload;
    },
    deletePassedAssignments: (state) => {
      state.coursePassedAssignment = undefined;
    },
    updatePassed: (state, action: PayloadAction<CoursePassedAssignmentEntity>) => {
      const newPassedAssignment = state.coursePassedAssignments?.map((passed) =>
        passed.id === action.payload.id ? action.payload : passed,
      );
      state.coursePassedAssignments = newPassedAssignment;
    },
    setCoursesParticipants: (state, action: PayloadAction<CourseParticipantEntity[]>) => {
      state.courseParticipants = action.payload;
    },
    createCoursesParticipant: (state, action: PayloadAction<CourseParticipantEntity>) => {
      state.courseParticipants?.push(action.payload);
    },
    deleteCourseParticipant: (state, action: PayloadAction<string | undefined>) => {
      state.courseParticipants = state.courseParticipants?.filter(
        (paticipant) => paticipant.id !== action.payload,
      );
    },
    resetCourse: () => initialState,
  },
});

export const {
  setCourses,
  setCourse,
  createCourses,
  updateCourses,
  deleteCourses,
  setCourseTopics,
  setCourseTopic,
  updateCourseTopic,
  createCoursesTopic,
  deleteCourseTopic,
  createCoursesTopicActivity,
  setCourseTopicActivities,
  setCourseTopicActivity,
  updateCoursesTopicActivity,
  deleteCourseActivity,
  setPassedAssignments,
  setGradeBooks,
  createPassedAssignments,
  deletePassedAssignments,
  setPassedAssignment,
  updatePassed,
  setCoursesParticipants,
  createCoursesParticipant,
  deleteCourseParticipant,
  resetCourse,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
