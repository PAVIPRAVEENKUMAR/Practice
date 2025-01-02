import { Module } from '@nestjs/common';
import { EmailRepository } from './emails.repository';
import { EmailService } from './emails.service';
import { Email, EmailSchema } from './emails.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }])],
  providers: [EmailService, EmailRepository],
  exports:[EmailRepository]
})
export class EmailModule {}