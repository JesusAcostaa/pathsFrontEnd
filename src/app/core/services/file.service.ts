import {
  getDownloadURL,
  listAll,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { inject, Injectable, signal } from '@angular/core';
import { StorageReference } from '@firebase/storage';
import { RoutesService } from './routes.service';
import { LearningRoutes } from '../interfaces';

const PATHS = {
  images: 'images',
  videos: 'videos',
};

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly _storage = inject(Storage);
  private routesService = inject(RoutesService);

  public async uploadImage(file: File | undefined): Promise<string> {
    const storageRef = ref(this._storage, `${PATHS.images}/${file?.name}`);
    return this.upload(storageRef, file);
  }

  public async uploadVideo(file: File | undefined): Promise<string> {
    const storageRef = ref(this._storage, `${PATHS.videos}/${file?.name}`);
    return this.upload(storageRef, file);
  }

  public uploadFiles(files: File[], route: LearningRoutes) {
    return Promise.all(
      files.map(async file => {
        const path = file.type.includes('image') ? PATHS.images : PATHS.videos;
        const storageRef = ref(this._storage, `${path}/${file.name}`);
        const response = await uploadBytes(storageRef, file ?? ({} as File));
        const url = await this.getDownloadURLByRef(response.ref);

        await this.routesService.send(route, url);
      })
    );
  }

  private getDownloadURLByRef(storageRef: StorageReference) {
    return getDownloadURL(storageRef);
  }

  public async getAllImages(): Promise<string[]> {
    const storageRef = ref(this._storage, `${PATHS.images}`);
    const list = await listAll(storageRef);

    return await Promise.all(
      list.items.map(async item => await getDownloadURL(item))
    );
  }

  public async getAllVideos() {
    const storageRef = ref(this._storage, `${PATHS.videos}`);
    const list = await listAll(storageRef);

    return await Promise.all(
      list.items.map(async item => await getDownloadURL(item))
    );
  }

  private async upload(
    storageRef: StorageReference,
    file: File | undefined
  ): Promise<string> {
    await uploadBytes(storageRef, file ?? ({} as File));
    return await getDownloadURL(storageRef);
  }
}
