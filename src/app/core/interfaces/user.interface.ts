import { MenuItem } from 'primeng/api';

export interface UserInformation {
  id: string;
  email: string;
  role: UserRoles;
  name: string;
  photoURL: string;
  menu?: MenuItem[];
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
