import { IsEmail, IsNotEmpty } from 'class-validator';
import { ResponseSuccessDto } from '~/shared/success-dto';

export class UserDto extends ResponseSuccessDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
