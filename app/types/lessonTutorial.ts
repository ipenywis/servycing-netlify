export interface INewLessonTutorialDTO {
  courseId: string;
  title: string;
  content: string;
}

export interface IUpdateLessonTutorialDTO {
  id: string;
  title: string;
  content: string;
}

export interface ILessonTutorial {
  id: string;
  title: string;
  content: string;
}
