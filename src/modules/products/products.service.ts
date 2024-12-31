import { Injectable } from '@nestjs/common';
import { IProductService } from './products.service.interface';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(productDto: { name: string; description: string; price: number }): Promise<any> {
    return this.productRepository.create(productDto);
  }

  async findAllProducts(): Promise<any[]> {
    return this.productRepository.findAll();
  }

  async findProductById(id: string): Promise<any> {
    return this.productRepository.findById(id);
  }

  async updateProduct(id: string, productDto: Partial<{ name: string; description: string; price: number }>): Promise<any> {
    return this.productRepository.update(id, productDto);
  }

  async deleteProduct(id: string): Promise<any> {
    return this.productRepository.delete(id);
  }
}