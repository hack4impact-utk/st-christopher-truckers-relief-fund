export type PasswordResetToken = {
  _id?: string;
  token: string;
  userId: string;
  expires: string;
};
