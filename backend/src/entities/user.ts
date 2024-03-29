export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  isConfirmed: boolean;
  // eslint-disable-next-line no-unused-vars
  comparePassword: (password: string) => Promise<boolean>;
};
