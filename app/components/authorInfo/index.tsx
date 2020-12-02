import React from 'react';
import styled from 'styles/styled-components';
import { BlackText, GreyText } from 'components/text';
import { AuthorThumbnail } from 'components/authorThumbnail';
import { IInstructor } from 'types/instructor';

import AuthorImg from 'images/person-portrait.png';
import Skeleton from 'react-loading-skeleton';
import { Marginer } from 'components/marginer';

export interface IAuthorInfo {
  instructor?: IInstructor;
  isLoading?: boolean;
}

const AuthorInfoContainer = styled.div`
  width: 100%;
  margin-top: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
`;

const AuthorTitle = styled(BlackText)`
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 2px;
`;

export function AuthorInfo(props: IAuthorInfo) {
  const { instructor, isLoading } = props;

  if (isLoading)
    return (
      <AuthorInfoContainer>
        <Skeleton circle={true} width={55} height={55} />
        <Marginer margin={10} direction="vertical" />
        <Skeleton width="3em" count={1} height={7} />
      </AuthorInfoContainer>
    );

  if (!instructor) return null;

  const { firstName, lastName, shortBio } = instructor;

  console.log('Pic: ', instructor.picture);

  return (
    <AuthorInfoContainer>
      <AuthorThumbnail src={instructor.picture} size={60} />
      <AuthorTitle size={14}>{`${firstName} ${lastName}`}</AuthorTitle>
      <GreyText size={13} horizontalCenter>
        {shortBio}
      </GreyText>
    </AuthorInfoContainer>
  );
}
