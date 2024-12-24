import { Injectable } from '@nestjs/common';
import { PaymentGateway, PAYMENT_METHOD } from './payment.gateway';
import { Order } from '@prisma/client';

@Injectable()
export class PaymentService {
  
  public badProcessPayment(order: Order, paymentMethod: string): void {
    if (paymentMethod === 'creditCard') {
      
    } else if (paymentMethod === 'paypal') {
   
    } else if (paymentMethod === 'bitcoin') {
      
    } else {
     
    }
  }
  

  private paymentGateways: Record<string, PaymentGateway> = {};

  public registerPaymentGateway(
    paymentMethod: PAYMENT_METHOD,
    gateway: PaymentGateway,
  ) {
    this.paymentGateways[paymentMethod] = gateway;
  }

public async processPayment(order: Order, paymentMethod: PAYMENT_METHOD) {
    const gateway = this.paymentGateways[paymentMethod];
    if (gateway) {
      await gateway.processPayment(order);
    } else {
      throw new Error('Unsupported payment method!');
    }
  }
}