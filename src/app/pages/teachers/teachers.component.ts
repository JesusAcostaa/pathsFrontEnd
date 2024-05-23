import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import {
  FormDialogComponent,
  ProfilePictureComponent,
} from '../../shared/components';
import {
  FormDialogParams,
  UserInformation,
  UserRoles,
} from '../../core/interfaces';
import {
  AuthService,
  LoaderService,
  TeachersService,
  ToastService,
} from '../../core/services';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { HasLoaderService, withLoader } from '../../core/decorartors';
import { TOAST_MESSAGES } from './constants';
import { FileService } from '../../core/services/file.service';
import { ImageModule } from 'primeng/image';

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    CardModule,
    TableModule,
    RippleModule,
    FormDialogComponent,
    ConfirmPopupModule,
    ToastModule,
    ProfilePictureComponent,
    ImageModule,
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent implements OnInit, HasLoaderService {
  public formDialog = viewChild(FormDialogComponent);

  private authService = inject(AuthService);
  private fileService = inject(FileService);
  private toastService = inject(ToastService);
  private teachersService = inject(TeachersService);
  private confirmationService = inject(ConfirmationService);

  readonly loaderService = inject(LoaderService);

  public isModalVisible = signal(false);
  public selectedTeacher = signal<UserInformation | undefined>(undefined);

  async ngOnInit() {
    await this.getTeachers();
  }

  @withLoader()
  private async getTeachers() {
    await this.teachersService.getAll();
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
      accept: async () => await this.deleteTeacher(id),
    });
  }

  public async handleSave(params: FormDialogParams) {
    const isEdit = !!this.selectedTeacher();
    isEdit
      ? await this.updateTeacher(params)
      : await this.createTeacher(params);
  }

  @withLoader()
  private async createTeacher({ user, file }: FormDialogParams) {
    const url = await this.uploadTeacherImage(file);

    await this.teachersService.add({
      ...user,
      photoURL: url,
    });
    this.closeDialog();
    await this.createAuthUser(user.email);

    this.toastService.showSuccess(TOAST_MESSAGES.created);
  }

  private async createAuthUser(email: string) {
    await this.authService.createUser(email);
  }

  @withLoader()
  private async updateTeacher({ user, file }: FormDialogParams) {
    const url = file.name && (await this.uploadTeacherImage(file));
    await this.teachersService.update({
      ...user,
      photoURL: url || user.photoURL,
    });

    this.closeDialog();
    this.toastService.showSuccess(TOAST_MESSAGES.updated);
  }

  @withLoader()
  private async deleteTeacher(id: string) {
    await this.teachersService.delete(id);
    this.toastService.showSuccess(TOAST_MESSAGES.deleted);
  }

  private async uploadTeacherImage(file: File) {
    return await this.fileService.uploadImage(file);
  }

  public openDialog() {
    this.isModalVisible.set(true);
  }

  public closeDialog() {
    this.isModalVisible.set(false);
  }

  get teachers() {
    return this.teachersService.teachers;
  }
}
