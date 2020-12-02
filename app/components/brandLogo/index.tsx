import React from "react";
import styled from "styles/styled-components";
import { Link } from "components/link";
import ROUTES from "containers/ROUTES";
import LogoImg from "images/logos/logo.png";
import ImageLoader from "react-imageloader";

export interface IBrandLogoProps {
  size?: number;
}

const LogoContainer = styled.div<IBrandLogoProps>`
  width: ${({ size }) => (size ? `${100 + size}px` : "140px")};
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const LogoText = styled.div<IBrandLogoProps>`
  color: #fff;
  font-weight: 700;
  font-size: ${({ size }) => (size ? `${size}px` : "22px")};
`;

const LogoImgContainer = styled.div`
  width: 20px;
  margin-bottom: 3px;
  margin-right: 3px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export function BrandLogo(props: IBrandLogoProps) {
  return (
    <LogoContainer {...props}>
      <Link to={ROUTES.homePage} noEffects>
        <LogoImgContainer>
          <ImageLoader src={LogoImg} />
        </LogoImgContainer>
      </Link>
      <Link to={ROUTES.homePage} noEffects>
        <LogoText {...props}>Servycing</LogoText>
      </Link>
    </LogoContainer>
  );
}
