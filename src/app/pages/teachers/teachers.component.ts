import {
  Component,
  inject,
  model,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { FormDialogComponent } from './components/organisms/form-dialog/form-dialog.component';
import { UserInformation } from '../../core/interfaces';
import { TeachersService } from '../../core/services';
import { JsonPipe } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    CardModule,
    TableModule,
    RippleModule,
    FormDialogComponent,
    JsonPipe,
    ConfirmPopupModule,
    ToastModule,
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent implements OnInit {
  public formDialog = viewChild(FormDialogComponent);

  private teachersService = inject(TeachersService);
  private confirmationService = inject(ConfirmationService);

  public isModalVisible = signal(false);
  public teachers = signal<UserInformation[]>([]);

  public selectedTeacher = signal<UserInformation | undefined>(undefined);

  ngOnInit() {
    this.getTeachers();
  }

  private getTeachers() {
    this.teachersService.getAll().subscribe(teachers => {
      this.teachers.set(teachers);
    });
  }

  public handleSave() {
    this.selectedTeacher.set(undefined);
    this.formDialog()?.resetForm();
    this.openDialog();
  }

  public async createTeacher(teacher: UserInformation) {
    await this.teachersService.add(teacher);
    this.teachers.update(teachers => teachers.concat(teacher));
    this.closeDialog();
  }

  public deleteTeacher({ id, name }: UserInformation, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Estás seguro que deseas eliminar a ${name}`,
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.teachersService.delete(id);
        this.teachers.update(teachers => teachers.filter(t => t.id !== id));
      },
    });
  }

  public editTeacher(teacher: UserInformation) {
    this.selectedTeacher.set(teacher);
    this.openDialog();
  }

  public openDialog() {
    this.isModalVisible.set(true);
  }

  public closeDialog() {
    this.isModalVisible.set(false);
  }
}
