export type ApiResponse<T> = {
  status: string;
  statuscode: number;
  message?: string;
  data: T;
  count?: number;
};

export type JWTPayload = {
  sub: string;
};

export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER',
}
