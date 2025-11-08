
export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface ICurrentUser {
  user: IUser;
  token: string;
}
