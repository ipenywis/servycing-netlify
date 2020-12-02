import gql from 'graphql-tag';

export const GET_PROCESSING_VIDEOS = gql`
  query getProcessingVideos {
    processingVideos {
      id
      filename
      size
      status
    }
  }
`;

export const GET_PROCESSED_VIDEOS = gql`
  query getProcessedVideos {
    processedVideos: videos {
      id
      name
      duration
      size
    }
  }
`;

export const GET_PROCESSED_VIDEOS_BY_COURSE = gql`
  query getProcessedVideos($courseId: String!) {
    processedVideos: courseVideos(courseId: $courseId) {
      id
      name
      duration
      size
    }
  }
`;

export const GET_VIDEO = gql`
  query getVideo($videoId: String!) {
    video(videoId: $videoId) {
      id
      name
      size
      duration
    }
  }
`;
