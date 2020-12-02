import React, { useState } from 'react';
import styled, { theme } from 'styles/styled-components';
import ImageLoader from 'react-imageloader';
import { BlackText, ErrorText } from 'components/text';
import { ICourseCategory } from 'types/courseCategory';
import { Button } from 'components/button';
import { ButtonTheme } from 'components/button/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import courseCategoryService from 'services/courseCategoryService';

export interface IAdminCourseCategoryProps extends ICourseCategory {
  onCategoryDeleted?: (id: string) => void;
}

const CategoryContainer = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #a4a4a4;
  background-color: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;

  &:not(:last-of-type) {
    margin-bottom: 14px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 2.2em;
  height: 2em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteIcon = styled.div`
  font-size: 12px;
  color: ${theme.default.dangerLight};
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    color: ${theme.default.dangerDark};
  }
`;

export function AdminCourseCategory(props: IAdminCourseCategoryProps) {
  const { name, logoUrl, id, onCategoryDeleted } = props;
  const [isDeleting, setDeleting] = useState(false);

  const onDelete = async () => {
    if (id) {
      setDeleting(true);
      const deleted = await courseCategoryService
        .deleteCategory(id)
        .catch(err => {
          console.log('Error: ', err);
        });

      if (deleted) onCategoryDeleted && onCategoryDeleted(id);

      setDeleting(false);
    }
  };

  return (
    <CategoryContainer>
      <TopContainer>
        <LogoContainer>
          <ImageLoader src={logoUrl}>Error!</ImageLoader>
        </LogoContainer>
        <BlackText size={15} marginLeft={9}>
          {name}
        </BlackText>
      </TopContainer>
      <BottomContainer>
        <DeleteIcon>
          {!isDeleting && (
            <FontAwesomeIcon icon={faTrashAlt} onClick={onDelete} />
          )}
          {isDeleting && <ErrorText size={13}>Deleting</ErrorText>}
        </DeleteIcon>
      </BottomContainer>
    </CategoryContainer>
  );
}
