export interface PaginatedResponse<T = any> {
  readonly data?: T;
  readonly pagination: {
    readonly page: number;
    readonly total: number;
    readonly limit: number;
    readonly last: number;
  };
}
