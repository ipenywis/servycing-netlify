import React from "react";
import styled, { theme } from "styles/styled-components";
import { BrandLogo } from "components/brandLogo";
import { WhiteText, Text, BlackText } from "components/text";
import { Link } from "components/link";
import ROUTES from "containers/ROUTES";

export interface IFooterProps {}

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  margin-top: 2em;
  padding: 1em 4% 0 6%;
  background-color: ${theme.default.componentBackground};
  border-top: 1px solid ${theme.default.mutedBorderColor};
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex: 1;
  padding-top: 1em;
`;

const BottomContainer = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
`;

const BottomInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-top: 1.5px solid ${theme.default.mutedBorderColor};
`;

const LeftContainer = styled.div`
  display: flex;
  width: 50%;
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

const Title = styled(BlackText)`
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
      <InnerContainer>
        <LeftContainer>
          <ContentContainer>
            <Title noEffects bold>
              Content
            </Title>
            <FLink to={"#"}>Home</FLink>
            <FLink to="#">Browse Services</FLink>
          </ContentContainer>
          <ContentContainer>
            <Title noEffects bold>
              Access
            </Title>
            <FLink to="#">About</FLink>
            <FLink to="#">Become a Specialist</FLink>
            <FLink to="#">Customer signin</FLink>
            <FLink to="#">Join as Customer</FLink>
          </ContentContainer>
        </LeftContainer>
        <RightContainer></RightContainer>
      </InnerContainer>
      <BottomContainer>
        <BottomInnerContainer>
          <BrandLogo size={26} color={theme.default.greyText} logoSize={24} />
          <SmallMutedLink to="#">Terms &amp; Conditions</SmallMutedLink>
          <SmallMutedLink to="#">Made with ❤️ &copy; Servycing</SmallMutedLink>
        </BottomInnerContainer>
      </BottomContainer>
    </FooterContainer>
  );
}
