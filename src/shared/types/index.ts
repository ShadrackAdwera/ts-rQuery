export enum Roles {
  ADMIN = 'admin',
  AGENT = 'agent',
  USER = 'user',
}

export interface User {
  id: string;
  email: string;
  role: Roles;
  token: string;
}

export interface NewUser {
  username: string;
  email: string;
  role: Roles;
  password: string;
}
