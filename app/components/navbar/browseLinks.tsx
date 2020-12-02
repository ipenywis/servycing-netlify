import React from 'react';
import styled, { theme } from 'styles/styled-components';
import { WhiteText } from 'components/text';
import { Link } from 'components/link';
import ROUTES from 'containers/ROUTES';

export interface IBrowseLinksProps {}

const BrowseLinksContainer = styled.div`
  width: auto;
  height: fit-content;
  margin-left: 3em;
  display: flex;
`;

const BrowseLink = styled(Link)`
  color: ${theme.default.primaryText};
  font-size: 15px;
  transition: all 200ms ease-in-out;
  margin-right: 1.7em;
  font-weight: 500;
  cursor: pointer;
  padding-top: 2px;

  &:hover {
    filter: contrast(0.8);
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export function BrowseLinks(props: IBrowseLinksProps) {
  return (
    <BrowseLinksContainer>
      <BrowseLink to="#">Topics</BrowseLink>
      <BrowseLink to={ROUTES.browseCoursesPage}>Browse</BrowseLink>
    </BrowseLinksContainer>
  );
}
