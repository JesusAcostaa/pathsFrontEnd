import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormDialogComponent } from '../../shared/components';
import { FileService } from '../../core/services/file.service';
import { AuthService, LoaderService, ToastService } from '../../core/services';
import { ConfirmationService } from 'primeng/api';
import {
  FormDialogParams,
  UserInformation,
  UserRoles,
} from '../../core/interfaces';
import { HasLoaderService, withLoader } from '../../core/decorartors';
import { TOAST_MESSAGES_STUDENT } from '../teachers/constants';
import { StudentsService } from '../../core/services';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { TitleCasePipe } from "@angular/common";
import { FormatLearningStylePipe } from "../learning-style-survey/utils/format-learning-style.pipe";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmPopupModule,
    ToolbarModule,
    RippleModule,
    TableModule,
    FormDialogComponent,
    ImageModule,
    TitleCasePipe,
    FormatLearningStylePipe,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit, HasLoaderService {
  public formDialog = viewChild(FormDialogComponent);

  private authService = inject(AuthService);
  private fileService = inject(FileService);
  private toastService = inject(ToastService);
  private studentsService = inject(StudentsService);
  private confirmationService = inject(ConfirmationService);

  readonly loaderService = inject(LoaderService);

  public isModalVisible = signal(false);
  public selectedTeacher = signal<UserInformation | undefined>(undefined);

  public role = UserRoles.Student;

  async ngOnInit() {
    await this.getTeachers();
  }

  @withLoader()
  private async getTeachers() {
    await this.studentsService.getAll();
  }

  public handleAdd() {
    this.selectedTeacher.set(undefined);
    this.formDialog()?.resetForm();
    this.openDialog();
  }

  public handleEdit(teacher: UserInformation) {
    this.selectedTeacher.set(teacher);
    this.openDialog();
  }

  public handleDelete({ id, name }: UserInformation, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Estás seguro que deseas eliminar a ${name}`,
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => await this.deleteStudent(id),
    });
  }

  public async handleSave(params: FormDialogParams) {
    const isEdit = !!this.selectedTeacher();
    isEdit
      ? await this.updateStudent(params)
      : await this.createTeacher(params);
  }

  @withLoader()
  private async createTeacher({ user, file }: FormDialogParams) {
    const url = await this.uploadStudentImage(file);

    await this.studentsService.add({
      ...user,
      photoURL: url,
    });
    this.closeDialog();
    await this.createAuthUser(user.email);

    this.toastService.showSuccess(TOAST_MESSAGES_STUDENT.created);
  }

  private async createAuthUser(email: string) {
    await this.authService.createUser(email);
  }

  @withLoader()
  private async updateStudent({ user, file }: FormDialogParams) {
    const url = file.name && (await this.uploadStudentImage(file));
    await this.studentsService.update({
      ...user,
      photoURL: url || user.photoURL,
    });

    this.closeDialog();
    this.toastService.showSuccess(TOAST_MESSAGES_STUDENT.updated);
  }

  @withLoader()
  private async deleteStudent(id: string) {
    await this.studentsService.delete(id);
    this.toastService.showSuccess(TOAST_MESSAGES_STUDENT.deleted);
  }

  private async uploadStudentImage(file: File) {
    return await this.fileService.uploadImage(file);
  }

  public openDialog() {
    this.isModalVisible.set(true);
  }

  public closeDialog() {
    this.isModalVisible.set(false);
  }

  get students() {
    return this.studentsService.students;
  }
}
