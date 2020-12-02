import React from 'react';
import styled, { theme } from 'styles/styled-components';
import { BrandLogo } from 'components/brandLogo';
import { WhiteText, Text } from 'components/text';
import { Link } from 'components/link';
import ROUTES from 'containers/ROUTES';

export interface IFooterProps {}

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 350px;
  margin-top: 2em;
  padding: 1em 4% 0 6%;
  background-color: ${theme.default.primaryBackground};
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex: 1;
`;

const BottomContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  width: 50%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-right: 6rem;
  }
`;

const Title = styled(WhiteText)`
  font-size: 21px;
  margin-bottom: 8px;
`;

const FLink = styled(Link)`
  color: #807b7b;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 5px;
`;

const SmallMutedLink = styled(Link)`
  color: #807b7b;
  font-size: 13px;

  &:not(:first-of-type) {
    margin-left: 1em;
  }
`;

export function Footer(props: IFooterProps) {
  return (
    <FooterContainer>
      <TopContainer>
        <BrandLogo size={33} />
      </TopContainer>
      <InnerContainer>
        <LeftContainer>
          <ContentContainer>
            <Title noEffects>Content</Title>
            <FLink to={ROUTES.browseCoursesPage}>Browse Courses</FLink>
            <FLink to="#">Browse by Topic</FLink>
            <FLink to="#">Go Pro</FLink>
            <FLink to="#">Home</FLink>
          </ContentContainer>
          <ContentContainer>
            <Title noEffects>Learn More</Title>
            <FLink to="#">About</FLink>
            <FLink to="#">Become Instructor</FLink>
            <FLink to="#">Pro Features</FLink>
            <FLink to="#">Instructors</FLink>
          </ContentContainer>
        </LeftContainer>
        <RightContainer></RightContainer>
      </InnerContainer>
      <BottomContainer>
        <SmallMutedLink to="#">Terms &amp; Conditions</SmallMutedLink>
        <SmallMutedLink to="#">Made with ❤️ &copy; Slearn</SmallMutedLink>
      </BottomContainer>
    </FooterContainer>
  );
}
