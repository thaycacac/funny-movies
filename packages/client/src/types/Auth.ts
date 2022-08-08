import { EnumMessageCode } from '../enums';

export interface AuthParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  email: string;
  code: EnumMessageCode;
}
