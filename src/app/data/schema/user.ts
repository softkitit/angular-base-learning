export interface User {
  username: string;
  email: string;
  roles: string[];
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  roles: string[]
}

