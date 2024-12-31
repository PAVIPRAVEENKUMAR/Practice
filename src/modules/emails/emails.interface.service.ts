export interface IEmailService {
    sendEmail(to: string, subject: string,  templates: string, body: string): Promise<void>;
    getEmails(): Promise<any[]>;
  }  