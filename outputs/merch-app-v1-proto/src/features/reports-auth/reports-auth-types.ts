export type ReportsAuth = {
  id: string;
  merchantLoginId: number;
  businessSlug: string | null;
  created: string;
  principalType: 'BusinessUser';
  role: 'admin' | null;
  ttl: number;
};

export type ReportsLoginRequest = {
  email: string;
  password: string;
};

export type PostResetPasswordEmail = {
  email: string;
};

export type ResetPassword = {
  password: string;
};
