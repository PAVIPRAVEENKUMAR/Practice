import { Injectable } from '@nestjs/common';
import { StorageFetcher } from './storage.service';

const cloudStorage: any = {};

@Injectable()
export class StorageCSFetcherService implements StorageFetcher {
  public async findFile(filename: string) {
    
    const bucket = cloudStorage.bucket('STORAGE');
    const file = bucket.file(filename);
    
    const [fileContent] = await file.download();
    return fileContent;
  }
}