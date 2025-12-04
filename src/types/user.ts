export type UserId = string;
export type UserName = string;
export type UserEmail = string;

export interface UserEntity {
  id: UserId;
  name: UserName;
  email: UserEmail;
}

export interface UserRecord {
  identifier: string;
  fullName: string;
  emailAddress: string;
}

