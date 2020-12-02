import { FormState } from 'final-form';

export enum FORMS {
  SIGNUP_FORM = 'signupForm',
  LOGIN_FORM = 'loginForm',

  STUDENT_PROFILE_FORM = 'studentProfileForm',

  COURSE_INFO_FORM = 'courseInfoForm',
  COURSE_PREREQISITS_FORM = 'coursePrerequisitsForm',
  COURSE_BENEFITS_FORM = 'courseBenefitsForm',
  COURSE_LESSONS_FORM = 'courseLessonsForm',
  COURSE_LESSON_TUTORIAL_FORM = 'courseLessonTutorialForm',
  COURSE_ACCESSIBILITY_FORM = 'courseAccessibilityForm',

  ADMIN_DASHBOARD_NEW_COURSE_CATEGORY = 'adminDashboardNewCourseCategory',
  ADMIN_DASHBOARD_NEW_INSTRUCTOR = 'adminDashboardNewInstructor',
}

export interface IFinalFormState {
  [key: string]: FormState<any>;
}
