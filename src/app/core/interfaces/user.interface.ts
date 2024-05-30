import { MenuItem } from 'primeng/api';
import { LearningRoutes } from "./index";

export interface UserInformation {
  id: string;
  email: string;
  role: UserRoles;
  name: string;
  photoURL: string;
  menu?: MenuItem[];
  learningPath?: LearningRoutes;
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
