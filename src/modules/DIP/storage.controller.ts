import { Controller, Get, Param } from '@nestjs/common';
import { StorageFetcher, StorageService } from './storage.service';
import { StorageS3FetcherService } from './storage-s3-fetcher.service';
import { StorageCSFetcherService } from './storage-cs-fetcher.service';

@Controller('/storage')
export class StorageController {
  constructor(private storageService: StorageFetcher) {}

    @Get('/file/:filename')
  public getFile(@Param('filename') filename: string) {
    return this.storageService.findFile(filename);
  }
}