export interface IResponseUser {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  lastName2: string;
  dateOfBirth: string;
  profilePictureUrl: string;
  isVerified: boolean;
  role: string;
  addresses: any | null;
  preferences: any | null;
  paymentInfo: any | null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}
