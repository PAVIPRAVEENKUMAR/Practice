import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.schema';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async create(product: Partial<Product>): Promise<Product> {
    return new this.productModel(product).save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
  }

  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}