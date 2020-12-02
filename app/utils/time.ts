import { ILesson } from 'types/lesson';

export function formatTime(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  //ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  //ret += '' + secs + '';

  ret += '' + mins + (hrs ? '' : 'min');

  return ret;
}

export function calculateCourseDuration(lessons: ILesson[]): number {
  let duration = 0;
  for (const lesson of lessons) {
    if (lesson.video) duration += lesson.video.duration;
  }

  return duration;
}
