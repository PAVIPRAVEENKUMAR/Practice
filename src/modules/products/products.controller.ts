import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productDto: { name: string; description: string; price: number }) {
    return this.productService.createProduct(productDto);
  }

  @Get()
  async findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  async findProductById(@Param('id') id: string) {
    return this.productService.findProductById(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productDto: Partial<{ name: string; description: string; price: number }>) {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}