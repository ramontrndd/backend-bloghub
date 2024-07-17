export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  status: string;
  role: string  
  isDeletable: string;
  profilePicUrl: string;
}