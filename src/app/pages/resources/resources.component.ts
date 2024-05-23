import { Component, inject, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { LearningRoutes } from '../../core/interfaces';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileService } from '../../core/services/file.service';
import { LoaderService, ToastService } from '../../core/services';
import { withLoader } from '../../core/decorartors';

interface LearningRouteControl {
  name: string;
  code: LearningRoutes;
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    ToastModule,
    FileUploadModule,
    BadgeModule,
    NgIf,
    NgForOf,
    NgClass,
    CardModule,
    DropdownModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent {
  public fileService = inject(FileService);
  public readonly loaderService = inject(LoaderService);

  public learningRoutes: { name: string; code: LearningRoutes }[] = [
    { name: 'Visual', code: LearningRoutes.Visual },
    { name: 'Auditivo', code: LearningRoutes.Auditory },
    { name: 'Kinestésico', code: LearningRoutes.Kinesthetic },
    { name: 'Mixto', code: LearningRoutes.Mixed },
  ];

  public learningRoute = new FormControl<LearningRouteControl | null>(
    null,
    Validators.required
  );

  public files = signal<File[]>([]);

  constructor(
    private config: PrimeNGConfig,
    private toastService: ToastService
  ) {}

  choose(_: any, callback: Function) {
    callback();
  }

  onRemoveTemplatingFile(
    event: MouseEvent,
    removeFileCallback: Function,
    index: number
  ) {
    removeFileCallback(event, index);
  }

  onSelectedFiles(event: any) {
    this.files.set(event.currentFiles);
  }

  @withLoader()
  async uploadEvent() {
    const route = this.learningRoute.value?.code ?? LearningRoutes.Visual;
    await this.fileService.uploadFiles(this.files(), route);
    this.files.set([]);
    this.toastService.showSuccess('¡Archivos subidos correctamente! :)');
  }

  public formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;

    if (bytes === 0) {
      return `0 ${sizes ? sizes : [0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes && sizes[i]}`;
  }
}
