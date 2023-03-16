export enum UserRoleEnum {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export enum CourseActivityTypeEnum {
  LECTURE = 'LECTURE',
  ASSIGNMENT = 'ASSIGNMENT',
}
export interface FileEntity {
  id: string;
  src: string;
  filename: string;
  createdAt: Date;
}

export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber?: string;
  role: UserRoleEnum;
  cover: Partial<FileEntity>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseTopicEntity {
  id: string;
  title: string;
  course: Partial<CourseEntity>;
  activities: Partial<CourseActivityEntity>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseActivityEntity {
  id: string;
  title: string;
  type: CourseActivityTypeEnum;
  file: Partial<FileEntity>;
  topic: Partial<CourseTopicEntity>;
  // eslint-disable-next-line no-use-before-define
  passedAssignments: Partial<CoursePassedAssignmentEntity>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CoursePassedAssignmentEntity {
  id: string;
  mark?: number;
  activity: Partial<CourseActivityEntity>;
  // eslint-disable-next-line no-use-before-define
  participant: Partial<CourseParticipantEntity>;
  file: Partial<FileEntity>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseParticipantEntity {
  id: string;
  user: Partial<UserEntity>;
  // eslint-disable-next-line no-use-before-define
  course: Partial<CourseEntity>;

  createdAt: Date;
  updatedAt: Date;
}

export interface CourseEntity {
  id: string;
  name: string;
  description: string;
  group: Partial<GroupEntity>;
  meetingUrl?: string;
  cover: Partial<FileEntity>;
  teacher: Partial<UserEntity>;
  participants: Partial<CourseParticipantEntity>[];
  topics: Partial<CourseTopicEntity>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TopicEntity {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpecialityEntity {
  id: string;
  name: string;
}

export interface GroupEntity {
  id: string;
  name: string;
  courseNumber: number;
  speciality: Partial<SpecialityEntity>;
  createdAt: Date;
  updatedAt: Date;
}
