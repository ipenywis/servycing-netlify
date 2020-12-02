import React from 'react';
import styled from 'styles/styled-components';
import ImageLoader from 'react-imageloader';
import { Link } from 'components/link';

export interface IAuthorThumbnailProps {
  src: string;
  /**Default: 27 */
  size?: number;
  linkTo?: string;
  preloader?: () => React.ReactElement;
}

const ThumbnailContainer = styled(ImageLoader)<IAuthorThumbnailProps>`
  width: ${({ size }) => (size ? `${size}px` : '27px')};
  height: ${({ size }) => (size ? `${size}px` : '27px')};
  display: flex;

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;

export function AuthorThumbnail(props: IAuthorThumbnailProps) {
  return (
    <ThumbnailContainer {...props} wrapper={React.createFactory('div')}>
      Error!
    </ThumbnailContainer>
  );
}
