import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { EmailModule } from './modules/emails/emails.module';
import { OrderModule } from './modules/orders/orders.module';
import { ProductModule } from './modules/products/products.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb://localhost:27017/practice'),  MailerModule.forRoot({
      transport: {
        service: 'gmail', 
        auth: {
          user: 'praveenselfless@gmail.com',  
          pass: 'cdsw ktrl dwbs yrpr',  
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
    }),UserModule,EmailModule,OrderModule,ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}