import React, { useState, useEffect } from 'react';
import styled from 'styles/styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GreyText } from 'components/text';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ImageLoader from 'react-imageloader';

export interface ICourseCategoryProps {
  name: string;
  logoUrl: string;
}

const CourseCategoryContainer = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-right: 6px;
  }
`;

const LogoContainer = styled(ImageLoader)`
  width: 15px;
  height: 15px;
  margin-right: 2px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
`;

export function CourseCategory(props: ICourseCategoryProps) {
  const { name, logoUrl } = props;

  return (
    <CourseCategoryContainer>
      {logoUrl && <LogoContainer src={logoUrl}>Error!</LogoContainer>}
      <GreyText size={14} verticalCenter>
        {name}
      </GreyText>
    </CourseCategoryContainer>
  );
}
