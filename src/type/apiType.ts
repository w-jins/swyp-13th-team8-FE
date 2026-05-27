export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
}

export interface CalcPageResponse<T> {
  calculations: T[];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}
