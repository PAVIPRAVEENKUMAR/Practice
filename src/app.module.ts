import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { EmailModule } from './modules/emails/emails.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb://localhost:27017/practice'), MailerModule.forRoot({
      transport: {
        host:"smtp-relay.brevo.com",
        port:587, 
        auth: {
          user: '82d28f001@smtp-brevo.com',  
          pass: 'GDZmrJ0wMO5Y4vWE',  
        },
      },
      defaults: {
        from: '"Pranadhan Yoga"<praveenselfless@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),UserModule,EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}