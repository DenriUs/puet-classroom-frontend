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
  file?: File;
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
  readonly id: string;
  readonly title: string;
  // eslint-disable-next-line no-use-before-define
  readonly course: Partial<CourseEntity>;
  // eslint-disable-next-line no-use-before-define
  readonly activities: Partial<CourseActivityEntity>[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CourseActivityEntity {
  id: string;
  title: string;
  type: CourseActivityTypeEnum;
  files: Partial<FileEntity>[];
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
  passedAssignments: Partial<CoursePassedAssignmentEntity>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseEntity {
  id: string;
  name: string;
  group: string;
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
