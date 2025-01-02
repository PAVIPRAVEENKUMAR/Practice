export interface IProductService {
    createProduct(productDto: { name: string; description: string; price: number }): Promise<any>;
    findAllProducts(): Promise<any[]>;
    findProductById(id: string): Promise<any>;
    updateProduct(id: string, productDto: Partial<{ name: string; description: string; price: number }>): Promise<any>;
    deleteProduct(id: string): Promise<any>;
}  