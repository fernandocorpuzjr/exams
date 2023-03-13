export enum UserStatus {
  Registered = 'Registered',
  Initiated = 'Initiated',
}

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  createdOn?: Date | null;
}
