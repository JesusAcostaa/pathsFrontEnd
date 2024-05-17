import firebase from 'firebase/compat';

export interface UserInformation {
  email: string;
  role: UserRoles;
  name: string;
  photoURL: string;
}

export enum UserRoles {
  Admin = 'ADMIN',
  Student = 'STUDENT',
  Teacher = 'TEACHER',
}

export interface UserForm {
  email: string;
  password: string;
}
