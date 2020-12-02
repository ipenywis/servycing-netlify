import React from 'react';
import styled, {
  css,
  createGlobalStyle,
  theme,
} from 'styles/styled-components';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const classNames = {
  page: 'pagination-page',
  paginationContainer: 'pagination-container',
  active: 'pagination-active',
  next: 'pagination-next',
  previous: 'pagination-previous',
  break: 'pagination-break',
  disabled: 'disabled',
};

const PaginationContainer = styled(ReactPaginate).attrs({
  pageClassName: classNames.page,
  containerClassName: classNames.paginationContainer,
  activeClassName: classNames.active,
  nextClassName: classNames.next,
  previousClassName: classNames.previous,
  breakClassName: classNames.break,
  disabledClassName: classNames.disabled,
})``;

const PaginationStyle = createGlobalStyle`

    .${classNames.paginationContainer} {
      display: flex;
      list-style: none;
      align-items: center;
      padding: 0;

      * {
        :focus {
          outline: none;
        }
      }

      .${classNames.page}, .${classNames.previous}, .${classNames.next} {
        transition: all 300ms ease-in-out;
        
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        &:not(.disabled) {
          &:hover {
            background-color: ${theme.default.primary};
            color: ${theme.default.primaryText};
            font-weight: bold;
          }
        }
      }
    }

    .${classNames.page} {
      width: 32px;
      height: 32px;
      background: #ffffff;
      box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
      box-shadow: 0 0 0px 1px rgba(15,15,15,0.16);
      border-radius: 2px;
      display: flex;
      font-size: 13px;
      cursor: pointer;

      :not(:last-of-type) {
        margin-right: 9px;
      }
    }

    .${classNames.previous}, .${classNames.next} {
      cursor: pointer;
      width: 31px;
      height: 31px;
      background: #ffffff;
      box-shadow: 0 0 0px 1px rgba(15,15,15,0.16);
      border-radius: 2px;
      display: flex;

      &.disabled {
        filter: contrast(0.8);
        opacity: 0.4;
      }
    }

    .${classNames.next} {
      margin-left: 12px;
    }

    .${classNames.previous} {
      margin-right: 21px;
    }

    .${classNames.break} {
      margin-right: 8px;
      font-size: 16px;
      cursor: pointer;
    }

    .${classNames.active} {
      background-color: ${theme.default.primary};
      filter: brightness(1.04);
      font-weight: bold;
      color: ${theme.default.primaryText};
      //box-shadow: 0px 1px 4px 1px rgba(15, 15, 15, 0.22);
      //box-shadow: 0px 1px 4px 1px #3eb06fa8;
      //border: 1px solid rgba(15, 15, 15, 0.1);
    }
`;

export function Pagination(props: ReactPaginateProps) {
  return (
    <>
      <PaginationContainer
        nextLabel={<FontAwesomeIcon icon={faAngleRight} size="1x" />}
        previousLabel={<FontAwesomeIcon icon={faAngleLeft} size="1x" />}
        {...props}
      />
      <PaginationStyle />
    </>
  );
}
