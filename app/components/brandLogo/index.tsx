import React from "react";
import styled from "styles/styled-components";
import { Link } from "components/link";
import ROUTES from "containers/ROUTES";
import LogoImg from "images/logos/logo.png";
import ImageLoader from "react-imageloader";

export interface IBrandLogoProps {
  size?: number;
  height?: string;
  logoSize?: number;
  color?: string;
  logoOnly?: boolean;
}

const LogoContainer = styled.div<IBrandLogoProps>`
  width: ${({ size, logoSize, logoOnly }) =>
    size
      ? `${160 + size + (logoSize || 20)}px`
      : logoOnly
      ? logoSize + "px" || "20px"
      : "140px"};
  height: ${({ height }) => (height ? height : "100%")};
  display: flex;
  justify-content: start;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.div<IBrandLogoProps>`
  color: ${({ color }) => (color ? color : "#fff")};
  font-weight: 700;
  font-size: ${({ size }) => (size ? `${size}px` : "22px")};
  margin-left: 3px;
`;

const LogoImgContainer = styled.div<IBrandLogoProps>`
  width: ${({ logoSize }) => (logoSize ? logoSize + "px" : "20px")};
  margin-bottom: 3px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export function BrandLogo(props: IBrandLogoProps) {
  const { logoOnly } = props;

  return (
    <LogoContainer {...props}>
      <Link to={ROUTES.homePage} noEffects>
        <LogoImgContainer {...props}>
          <ImageLoader src={LogoImg} />
        </LogoImgContainer>
      </Link>
      {!logoOnly && (
        <Link to={ROUTES.homePage} noEffects>
          <LogoText {...props}>Servycing</LogoText>
        </Link>
      )}
    </LogoContainer>
  );
}
