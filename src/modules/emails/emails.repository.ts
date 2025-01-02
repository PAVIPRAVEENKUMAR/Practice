import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from './emails.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailRepository {
  constructor(
    @InjectModel(Email.name) private readonly emailModel: Model<EmailDocument>,
    private readonly mailerService: MailerService,
  ) {}

  async sendVerficationEmail({ to, subject, template, context: { name, verificationLink } }): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context: {
        name,
        verifyLink: verificationLink,
      },
    });
  }
  
  async sendWelcomeEmail({ to, subject, template, context: { name, startlink} }): Promise<void> {
    const email = new this.emailModel({
      to,
      subject,
      body: `Hello ${name}, Welcome to our app!`, 
    });
    await email.save();

    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context: { name,startlink },
    });

    await this.emailModel.findByIdAndUpdate(email._id, { status: 'sent' });
    console.log(`Welcome email sent to ${to}`);
  }

  async sendOtpEmail({to,subject, template, context:{name,verifyotp}}): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context:{
        name,
        verifyotp,
      }
    
    });
  }
  async findByVerificationToken(token: string): Promise<Email>{
    return this.emailModel.findOne({ verificationToken: token }).exec();
  }

  async saveEmail(email: Partial<Email>): Promise<Email> {
    return new this.emailModel(email).save();
  }

  async findAll(): Promise<Email[]> {
    return this.emailModel.find().exec();
  }
}