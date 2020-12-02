import gql from 'graphql-tag';

export const DELETE_VIDEO = gql`
  mutation deleteVideo($id: String!) {
    deleted: deleteVideo(videoId: $id)
  }
`;
