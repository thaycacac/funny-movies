import { EnumMessageCode } from '../enums';
import { User } from './User';

export interface AuthParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
  code: EnumMessageCode;
}
