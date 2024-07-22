export interface User {
  id?: number;
  name: string;
  contactNumber: number;
  email: string;
  password: string;
  status: string;
  role: string;
  profilePicUrl: string;
}

export interface CreateUser {
  name: string;
  email: string;
  contactNumber: number;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

