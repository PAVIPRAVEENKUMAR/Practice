import { Injectable } from '@nestjs/common';
import {
  EmailNotification,
  SMSNotification,
  PushNotification,
  Notification,
} from './notification.interfaces';


const ses: any = {};

@Injectable()
export class NotificationService {
  async badSendEmail(notification: Notification) {
    
    const params = {
      Source: 'no-reply@coderone.io',
      Destination: {
        ToAddresses: [notification.to],
      },
      Message: {
        Subject: {
          Data: notification.subject,
        },
        Body: {
          Text: {
            Data: notification.body,
          },
        },
      },
    };

    await ses.sendEmail(params);
  }

  badSendSMS(notification: Notification) {
    
  }

  badSendPushNotification(notification: Notification) {
    
  }

  sendEmail(notification: EmailNotification) {
    
}

  sendSMS(notification: SMSNotification): void {

  }

  sendPushNotification(notification: PushNotification): void {

  }
}