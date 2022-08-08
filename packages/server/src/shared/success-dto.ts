import { IsString } from 'class-validator';

export class ResponseSuccessDto {
  @IsString()
  code: string;
}
