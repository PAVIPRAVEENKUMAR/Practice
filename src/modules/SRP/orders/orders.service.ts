import { Injectable } from '@nestjs/common';
import { EmailsService } from '../emails/emails.service';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private emailsService: EmailsService,
  ) {}

  async submitOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    const createdOrder = await this.prisma.order.create({ data });
    
    this.emailsService.sendOrderEmail(createdOrder.orderId);

    return createdOrder;
  }
}