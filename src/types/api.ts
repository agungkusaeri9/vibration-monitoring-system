export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface ApiResponse<T> {
  status:boolean;
  // success: boolean;
  message: string;
  data: T;
  pagination?: PaginationMeta;
  errors?: string[];
}