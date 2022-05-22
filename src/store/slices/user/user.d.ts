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
  loggedUser: ILoggedUser;
  token: string | null;
};

export type IUser = {
  name: string;
  age: number;
  gender: string;
  email: string;
  image: string;
};

export type ILoggedUser = {
  age: number;
  email: string;
  gender: string;
  id: number;
  isAuth: boolean;
  name: string;
  password: string;
};
