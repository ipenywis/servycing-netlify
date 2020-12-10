import { useState } from "react";
import { ILoadRangeOptions } from "../../types/pagination";

export function usePagination(
  initialPage: number,
  count: number,
  DEFAULT_LOAD_RANGE: ILoadRangeOptions
): [ILoadRangeOptions, boolean, number, number, (page: number) => void] {
  const [page, setPage] = useState(initialPage);

  const pageCount = count / DEFAULT_LOAD_RANGE.range;

  const showPagination =
    count && count > DEFAULT_LOAD_RANGE.range ? true : false;

  const loadRange: ILoadRangeOptions = {
    start: DEFAULT_LOAD_RANGE.range * page,
    range: DEFAULT_LOAD_RANGE.range,
  };

  return [loadRange, showPagination, pageCount, page, setPage];
}
