export interface IVideo {
  id: string;
  name: string;
  duration: number;
  size: number;
}

export interface IUploadingVideo {
  name: string;
  size: number;
  type: string;
  progress: number;
}

export interface IUploadingVideoResponse {
  videoId: string;
  filename: string;
}

export enum VideoConversionStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
  CANCELED = 'CANCELED',
}

export interface IVideoConversion {
  id: string;
  filename: string;
  status: VideoConversionStatus;
  size?: number;
}
