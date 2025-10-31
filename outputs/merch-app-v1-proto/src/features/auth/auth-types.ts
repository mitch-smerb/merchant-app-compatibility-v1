export type Auth = {
  id: string;
  merchantId: number;
  principalType: string;
  created: string;
  ttl: number;
};

export type LoginRequest = {
  email: string;
};
