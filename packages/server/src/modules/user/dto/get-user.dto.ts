import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ResponseSuccessDto } from '~/shared/success-dto';

export class GetLoginDto extends ResponseSuccessDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  access_token: string;
}
