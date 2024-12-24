import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageFetcher, StorageService } from './storage.service';
import { StorageS3FetcherService } from './storage-s3-fetcher.service';
import { StorageCSFetcherService } from './storage-cs-fetcher.service';

@Module({
  controllers: [StorageController],
  providers: [
    { provide: StorageFetcher, useClass: StorageCSFetcherService },
  ],
})
export class StorageModule {}