import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailModule } from '../emails/emails.module';
import { EmailService } from '../emails/emails.service';

@Module({
  imports: [EmailModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService,EmailService],
})
export class UserModule {}