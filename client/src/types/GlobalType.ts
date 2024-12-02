export type User = {
  id: number;
  name: string;
  email: string;
};
export interface AddUserVariables {
  name: string;
  email: string;
}

export interface AddUserResponse {
  addUser: {
    id: string;
    name: string;
    email: string;
  };
}
