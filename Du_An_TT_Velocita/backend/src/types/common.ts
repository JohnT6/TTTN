export type paginationParams = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type apiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  pagination?: paginationParams;
};
