export type TLoginInfo = {
  email: string;
  password: string;
};

export type TJwtPayload = {
  id: string;
  email: string;
  role: string;
  name: { firstName: string; middleName?: string; lastName: string };
};
