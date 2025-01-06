export type PasswordResetToken = {
  _id?: string;
  userId: string;
  token: string;
  expires: string;
};
