import { Injectable } from '@nestjs/common';

const s3: any = {};
const cloudStorage: any = {};

@Injectable()

export class StorageService {
  public findAmazonS3File(filename: string) {
    
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

  public async findGoogleCloudStorageFile(filename: string) {
   
    const bucket = cloudStorage.bucket('STORAGE');
    const file = bucket.file(filename);

    const [fileContent] = await file.download();

    return fileContent;
  }
}


export abstract class StorageFetcher {
  abstract findFile(filename: string): any;
}
