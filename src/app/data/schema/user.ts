export interface User {
  username: string;
  password: string;
  token: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  roles: string[]
}
