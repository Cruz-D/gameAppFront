export interface IComment {
  commentId: string;      // id
  userId: string;
  userName: string;
  gameId: string;
  content: string;
  score: string;
  createdAt: string;
  updatedAt: string;
  isEdited?: boolean | null;
  isDeleted?: boolean | null;
}
