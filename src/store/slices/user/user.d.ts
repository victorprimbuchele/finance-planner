export type UserPayload = {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ResponseLogin = {
  id: number;
  email: string;
  password: string;
  token: string;
};

export type IUser = {
  name: string;
  age: number;
  gender: string;
  email: string;
  image: string;
};
