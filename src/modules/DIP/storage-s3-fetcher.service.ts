import { Injectable } from '@nestjs/common';
import { StorageFetcher } from './storage.service';

const s3: any = {};

@Injectable()
export class StorageS3FetcherService implements StorageFetcher {
  public findFile(filename: string) {
    
    const params = {
      Bucket: 'STORAGE',
      Key: process.env.AWS_key,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.error(err);
        throw new Error('Error fetching the file from S3');
      } else {
        return data.Body;
      }
    });
  }
}