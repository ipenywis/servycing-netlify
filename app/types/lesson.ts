import { IVideo } from './video';
import { ISlug } from './slug';
import { ILessonTutorial } from './lessonTutorial';

export interface ILesson {
  id: string;
  title: string;
  order: number;
  video?: IVideo;
  tutorial?: ILessonTutorial;
  slugs?: ISlug[];
}

export interface INewLessonDTO {
  title: string;
  order: number;
  videoId: string;
  tutorialId: string;
}
