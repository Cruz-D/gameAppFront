export interface IComment {
  id: string;          // id
  commentId: string;      // id
  userId: string;
  userName: string;
  productId: string;
  content: string;
  score: string;
  updatedAt: string;
  isEdited?: boolean | null;
  isDeleted?: boolean | null;
}
