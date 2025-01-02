import { Injectable } from '@nestjs/common';
import { IOrderService } from './orders.interface.service';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrderService implements IOrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(orderDto: { productId: string; userId: string; quantity: number }): Promise<any> {
    return this.orderRepository.create(orderDto);
  }

  async findAllOrders(): Promise<any[]> {
    return this.orderRepository.findAll();
  }

  async findOrderById(id: string): Promise<any> {
    return this.orderRepository.findById(id);
  }

  async updateOrderStatus(id: string, status: string): Promise<any> {
    return this.orderRepository.updateStatus(id, status);
  }

  async deleteOrder(id: string): Promise<any> {
    return this.orderRepository.delete(id);
  }
}