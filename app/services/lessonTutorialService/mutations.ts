import gql from 'graphql-tag';

export const ADD_NEW_LESSON_TUTORIAL = gql`
  mutation addNewLessonTutorial(
    $newLessonTutorialData: NewLessonTutorialInput!
  ) {
    lessonTutorial: addNewLessonTutorial(
      newLessonTutorialData: $newLessonTutorialData
    ) {
      id
      title
      content
    }
  }
`;

export const UPDATE_LESSON_TUTORIAL = gql`
  mutation updateLessonTutorial(
    $lessonTutorialData: UpdateLessonTutorialInput!
  ) {
    updated: updateLessonTutorial(lessonTutorialData: $lessonTutorialData)
  }
`;

export const DELETE_LESSON_TUTORIAL = gql`
  mutation deleteLessonTutorial($id: String!) {
    deleted: deleteLessonTutorial(id: $id)
  }
`;
