import { useMemo } from "react";

export default function usePagination(totalCount, perPage, currentPage) {
  return useMemo(() => {
    const totalPages = Math.ceil(totalCount / perPage);
    return [totalPages, Array.from(Array(totalPages).keys())];
  }, [totalCount, perPage]);
}
