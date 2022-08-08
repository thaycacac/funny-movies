import { EnumActionType } from '../enums';

export interface Movie {
  id: string;
  title: string;
  sharedBy: string;
  likeCount: number;
  dislikeCount: number;
  description: string;
  vote: EnumActionType;
}
