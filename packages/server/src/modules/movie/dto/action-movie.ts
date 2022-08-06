import { IsNotEmpty, IsUUID } from 'class-validator';
import { EnumActionType } from '~/enums';

export class ActionMovieDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  type: EnumActionType;
}
