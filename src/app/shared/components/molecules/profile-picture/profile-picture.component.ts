import { Component, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { UserInformation } from '../../../../core/interfaces';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FileSelectEvent } from 'primeng/fileupload/fileupload.interface';
import { ImageModule } from 'primeng/image';

const DEFAULT_IMAGE_PATH = 'assets/images/default_user.jpg';
const DEFAULT_IMAGE_NAME = 'default_user.jpg';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [NgOptimizedImage, FileUploadModule, ImageModule],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.css',
})
export class ProfilePictureComponent implements OnInit {
  public user = input<UserInformation>();
  public onSelect = output<File>();

  public selectedFileURL: string | undefined = undefined;

  @ViewChild(FileUpload) fileUpload!: FileUpload;

  async ngOnInit() {
    this.selectedFileURL = this.user()?.photoURL;
    if (!this.selectedFileURL) {
      const defaultFile = await this.getDefaultFile();
      this.onSelect.emit(defaultFile);
    }
  }

  public handleUpload({ currentFiles }: FileSelectEvent) {
    const [file] = currentFiles;
    this.selectedFileURL = URL.createObjectURL(file);
    this.onSelect.emit(file);

    this.fileUpload.clear();
  }

  private async getDefaultFile(): Promise<File> {
    const response = await fetch(DEFAULT_IMAGE_PATH);
    const blob = await response.blob();
    return new File([blob], DEFAULT_IMAGE_NAME, { type: blob.type });
  }
}
