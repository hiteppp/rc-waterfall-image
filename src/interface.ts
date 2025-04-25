export interface CommentType {
  comment_id?: number;
  created_at?: string;
  updated_at?: string;
  comment_pics: any[];
  content: string;
  like_nums:number;
  parent_comment_id: number;
  user: UserType;
}

export interface UserType {
  id: number;
  name: string;
  avatar: string;
}

export type ParamsType = Record<string, any> | {}
