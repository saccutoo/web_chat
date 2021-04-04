export interface User {
  _id?: number;
  avatar?: string;
  avatar_url: string;
  birthDay: string;
  createdAt: string;
  email: string;
  facebook: string;
  firstname: string;
  fullname: string;
  gender: number; //chưa dùng
  github: string;
  id: string;
  isadmin: null; //chưa dùng
  lastlogon: string;
  lastname: string;
  location: string;
  password: string;
  phone: string;
  role: string; //
  salt: any; //chưa dùng
  skype: string;
  status: number; //
  statuslogin: boolean; //
  updatedAt: string;
  username: string;
  statusUser: StatusUserTypes;
}

export interface User2 {
  id: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  salt: string;
  gender: '0' | '1' | '2';
  status: '0' | '1';
  isAdmin: number;
  lastLogin: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
  token:string
}

export enum StatusUserTypes {
  ONLINE = 1,
  OFFLINE = 0,
}
