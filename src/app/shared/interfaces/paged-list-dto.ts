export interface PagedList<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  items: T[];
  hasPrevious: boolean;
  hasNext: boolean;
}
