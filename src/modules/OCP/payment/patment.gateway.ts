import { Order } from '@prisma/client';


export abstract class PaymentGateway {
  abstract processPayment(order: Order): void;
}

export class CreditCardGateway implements PaymentGateway {
  processPayment(order: Order): void {
  }
}

export class PayPalGateway implements PaymentGateway {
  processPayment(order: Order): void {
  }
}

export class BitcoinGateway implements PaymentGateway {
  processPayment(order: Order): void {

  }
}

export class ApplePayGateway implements PaymentGateway {
  processPayment(order: Order): void {
    
  }
}

export enum PAYMENT_METHOD {
  CREDIT_CARD = 'credit-card',
  PAYPAL = 'paypal',
  Bitcoin = 'bitcoin',
  ApplePay ='applepay'
}