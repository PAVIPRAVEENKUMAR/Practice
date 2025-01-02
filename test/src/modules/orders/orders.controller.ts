import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: { productId: string; userId: string; quantity: number }) {
    return this.orderService.createOrder(orderDto);
  }

  @Get()
  async findAllOrders() {
    return this.orderService.findAllOrders();
  }

  @Get(':id')
  async findOrderById(@Param('id') id: string) {
    return this.orderService.findOrderById(id);
  }

  @Put(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() updateStatusDto: { status: string }) {
    return this.orderService.updateOrderStatus(id, updateStatusDto.status);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}