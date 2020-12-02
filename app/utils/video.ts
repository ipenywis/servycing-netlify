import { IVideo } from 'types/video';

//TODO: Recheck if need to be moved to server (not quite practical)
// 'http://localhost:5000/course/lesson/watch/868c1bea-8603-4aac-bdbd-537a9f2accd2/2019-06-03 00-34-36.m3u8',

export function makeHLSVideoUrl(video: IVideo | null): string {
  if (video) {
    const encodedName = encodeURI(video.name);
    const hlsUrl = `http://localhost:5000/course/lesson/watch/${video.id}/${encodedName}.m3u8`;
    return hlsUrl;
  }
  return '';
}
