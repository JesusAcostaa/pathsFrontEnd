import firebase from 'firebase/compat';

export type UserInformation = firebase.User | null;

export enum UserRoles {
  Admin = 'admin',
  Student = 'student',
  Teacher = 'teacher',
}
