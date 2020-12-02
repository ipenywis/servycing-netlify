import {
  IUploadingVideo,
  IVideoConversion,
  IVideo,
  IUploadingVideoResponse,
} from 'types/video';
import Axios from 'axios';
import endpoints from 'endpoints';
import messages from './messages';
import { apolloClient } from 'apolloGraphql';
import {
  GET_PROCESSING_VIDEOS,
  GET_PROCESSED_VIDEOS,
  GET_PROCESSED_VIDEOS_BY_COURSE,
  GET_VIDEO,
} from './queries';
import { parseGraphqlError } from 'utils/error';
import { DELETE_VIDEO } from './mutations';

class VideoService {
  public async uploadVideos(
    videoFiles: File[],
    courseId: string,
    onUploadProgress: (file: File) => (progressEvent: any) => void,
  ): Promise<IUploadingVideoResponse[]> {
    const uploadedVideos: IUploadingVideoResponse[] = [];

    for (const videoFile of videoFiles) {
      const config = {
        onUploadProgress: onUploadProgress(videoFile),
      };

      const formData = new FormData();
      formData.append('courseFiles', videoFile);
      formData.append('courseId', courseId);
      const response = await Axios.post(
        endpoints.UPLOAD_VIDEO,
        formData,
        config,
      ).catch(err => {
        throw new Error(err.response.data.message);
      });

      if (response && response.data) uploadedVideos.push(response.data.data);
      else throw new Error(messages.cannotUploadVideo);
    }
    return uploadedVideos;
  }

  public async getProcessingVideos(): Promise<IVideoConversion[]> {
    const queryResponse = await apolloClient
      .query({ query: GET_PROCESSING_VIDEOS })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (
      queryResponse &&
      queryResponse.data &&
      queryResponse.data.processingVideos
    )
      return queryResponse.data.processingVideos;
    else throw new Error(messages.cannotFetchProcessingVideos);
  }

  public async getCourseProcessedVideos(courseId: string): Promise<IVideo[]> {
    const queryResponse = await apolloClient
      .query({ query: GET_PROCESSED_VIDEOS_BY_COURSE, variables: { courseId } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (
      queryResponse &&
      queryResponse.data &&
      queryResponse.data.processedVideos
    )
      return queryResponse.data.processedVideos;
    else throw new Error(messages.cannoFetchProcessedVideos);
  }

  public async getProcessedVideos(): Promise<IVideo[]> {
    const queryResponse = await apolloClient
      .query({ query: GET_PROCESSED_VIDEOS })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (
      queryResponse &&
      queryResponse.data &&
      queryResponse.data.processedVideos
    )
      return queryResponse.data.processedVideos;
    else throw new Error(messages.cannoFetchProcessedVideos);
  }

  public async getVideo(id: string): Promise<IVideo> {
    const queryResponse = await apolloClient
      .query({ query: GET_VIDEO, variables: { videoId: id } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (queryResponse && queryResponse.data && queryResponse.data.video)
      return queryResponse.data.video;
    else throw new Error(messages.cannotFindVideoWithId);
  }

  public async deleteVideo(id: string): Promise<boolean> {
    const response = await apolloClient
      .mutate({ mutation: DELETE_VIDEO, variables: { id } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!response || !response.data || !response.data.deleted)
      throw new Error(messages.cannotDeleteVideo);
    else return response.data.deleted;
  }
}

export default new VideoService();
