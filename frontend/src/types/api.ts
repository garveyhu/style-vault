/** 后端响应通用 Result 结构 */
export type ApiResult<T> = {
  code: number;
  message: string;
  data: T;
};

export class ApiError extends Error {
  code?: number;
  status?: number;
  constructor(message: string, code?: number, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}
