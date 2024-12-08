export type User = {
  id: number;
  password: string;
  email: string;
};
export interface AddUserVariables {
  password: string;
  email: string;
}

export interface AddUserResponse {
  addUser: {
    id: string;
    username: string;
    email: string;
    password: string;
  };
}

export interface AuthResponse {
  login: {
    token: string;
    user: User;
  };
  signup: {
    token: string;
    user: User;
  };
}
