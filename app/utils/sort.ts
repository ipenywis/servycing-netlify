import { ILesson } from 'types/lesson';

export function sortLessonsByOrder(lessons: ILesson[]): ILesson[] {
  let sortedLessons: ILesson[] = lessons;
  if (lessons && lessons.length > 0) {
    sortedLessons = sortedLessons.sort((lesson1, lesson2) => {
      if (lesson1.order < lesson2.order) return -1;
      else if (lesson1.order > lesson2.order) return 1;
      else return 0;
    });
  }
  return sortedLessons;
}
