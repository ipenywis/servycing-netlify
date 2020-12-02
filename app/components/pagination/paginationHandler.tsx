import React, { useEffect } from 'react';
import styled from 'styles/styled-components';
import { Pagination } from 'components/pagination';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IPaginationOptions } from 'types/pagination';
import { useSelector, useDispatch } from 'react-redux';
import { scrollToTop } from 'utils/page';

export const DEFAULT_ITEMS_PER_PAGE = 4;
export const INITIAL_PAGINATION = { page: 0, limit: DEFAULT_ITEMS_PER_PAGE };

export interface IPaginationHandlerProps {
  count: number;
  pagination: IPaginationOptions;
  hide?: boolean;
  itemsPerPage?: number;

  onPageChange: (pagination: IPaginationOptions) => void;
  setPaginationOptions: (options: IPaginationOptions) => void;
}

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3em;
  margin-bottom: 2em;
`;

function PaginationHandler(props: IPaginationHandlerProps) {
  const { hide, pagination, count, itemsPerPage, setPaginationOptions } = props;

  const history = useHistory();

  const setPagination = (page: number) => {
    setPaginationOptions({
      page,
      limit: itemsPerPage || DEFAULT_ITEMS_PER_PAGE,
    });
  };

  const handlePageChange = (page: number) => {
    props.onPageChange({
      page: page,
      limit: itemsPerPage || DEFAULT_ITEMS_PER_PAGE,
    });
    scrollToTop();
  };

  const setPageQuery = (page: number) => {
    const urlSearchParams = new URLSearchParams(history.location.search);
    urlSearchParams.set('page', String(page + 1));
    history.push({
      search: urlSearchParams.toString(),
    });
  };

  const getPage = (search: string) => {
    const pageSearchParams = new URLSearchParams(search);
    const currentPage = pageSearchParams.get('page');
    return currentPage ? parseInt(currentPage) - 1 : undefined;
  };

  const loadCurrentPage = (page: number) => {
    setPagination(page);
    handlePageChange(page);
  };

  const loadDefaultPage = () => {
    setPagination(0);
    handlePageChange(0);
  };

  const onPageChange = (item: { selected: number }) => {
    setPageQuery(item.selected);
    setPagination(item.selected);
    handlePageChange(item.selected);
  };

  useEffect(() => {
    const currentPage = getPage(history.location.search);
    if (currentPage) loadCurrentPage(currentPage);
    else loadDefaultPage();
  }, []);

  console.log('Count: ', count, pagination);

  if (hide) return null;

  return (
    <PaginationContainer>
      <Pagination
        pageCount={Math.ceil(count / pagination.limit)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        forcePage={pagination.page}
        onPageChange={onPageChange}
      />
    </PaginationContainer>
  );
}

PaginationHandler.defaultProps = {
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
};

export { PaginationHandler };
