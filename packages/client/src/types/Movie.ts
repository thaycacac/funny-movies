import { EnumActionType } from '../enums';

export interface Movie {
  id: string;
  title: string;
  sharedBy: string;
  youtubeId: string;
  likeCount: number;
  dislikeCount: number;
  description: string;
  status: EnumActionType;
}

export interface MovieParams {
  url: string;
}

export interface MovieActionParams {
  id: string;
  type: EnumActionType;
}
