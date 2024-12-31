import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './orders.schema';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) {}

  async create(order: Partial<Order>): Promise<Order> {
    return new this.orderModel(order).save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findById(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}