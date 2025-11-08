
export interface IUser {
  id: number;
  email: string;
  name: string | null;
}

export interface ICurrentUser {
  user: IUser;
  token: string;
}
