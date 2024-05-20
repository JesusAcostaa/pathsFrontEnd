import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { inject, Injectable } from '@angular/core';

const PATHS = {
  images: 'images',
};

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly _storage = inject(Storage);

  async uploadImage(file: File | undefined): Promise<string> {
    const storageRef = ref(this._storage, `${PATHS.images}/${file?.name}`);

    await uploadBytes(storageRef, file ?? ({} as File));
    return await getDownloadURL(storageRef);
  }
}
