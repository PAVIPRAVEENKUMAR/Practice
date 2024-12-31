import { Injectable } from '@nestjs/common';
import { IEmailService } from './emails.interface.service';
import { EmailRepository } from './emails.repository';

@Injectable()
export class EmailService implements IEmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendVerificationEmail(to: string, name: string, verificationToken: string): Promise<void> {
    
    const verificationLink = `http://localhost:3300/users/verify-email?token=${verificationToken}`;
     
    await this.emailRepository.sendVerficationEmail({
      to,
      subject: 'Email Verification',
      template: 'verify-email',  
      context: {
        name,
        verificationLink, 
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {

    const startlink = 'http://www.akhiraservices.com/'
  
    await this.emailRepository.sendWelcomeEmail({
      to,
      subject: 'Welcome to Our App!',
      template: 'welcomemail',
      context: { name, startlink},
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const email = { to, subject, body, sentAt: new Date() };
    await this.emailRepository.saveEmail(email);
  }

  async getEmails(): Promise<any[]> {
    return this.emailRepository.findAll();
  }
}