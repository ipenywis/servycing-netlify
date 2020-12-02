import { IInstructor } from './instructor';
import { ILesson, INewLessonDTO } from './lesson';
import { ICourseBenefit } from './courseBenefit';
import { ICoursePrerequisite } from './coursePrerequisite';
import { ISlug } from './slug';
import { ILessonTutorial } from './lessonTutorial';
import { ISelectedCourseCategoryDTO, ICourseCategory } from './courseCategory';

export interface ICourse {
  id?: string;
  published?: boolean;
  name: string;
  thumbnailUrl?: string;
  description?: string;
  numEnrolled?: number;
  instructor?: IInstructor;
  benefits?: ICourseBenefit[];
  prerequisites?: ICoursePrerequisite[];
  slugs?: ISlug[];
  categories?: ICourseCategory[];
  price: number;
  free: boolean;

  content?: {
    lessons: ILesson[];
    lessonTutorials?: ILessonTutorial[];
  };
}

export enum CourseSort {
  POPULAR = 'Popular',
  RECENT = 'Recent',
}

export interface ICoursesWithCount {
  courses: ICourse[];
  count?: number;
}

export interface INewCourseDTO {
  name: string;
  description: string;
}

export interface IBulkUpdateCourseDTO {
  id: string;
  name?: string;
  description?: string;
  thumbnail?: string;
  benefits?: string[];
  prerequisites?: string[];
  lessons?: INewLessonDTO[];
  categories?: ISelectedCourseCategoryDTO[];
  price?: number;
}

export interface ICourseThumbnailUploadDTO {
  courseId: string;
  image: File;
}
