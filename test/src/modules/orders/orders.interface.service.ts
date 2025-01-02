export interface IOrderService {
    createOrder(orderDto: { productId: string; userId: string; quantity: number }): Promise<any>;
    findAllOrders(): Promise<any[]>;
    findOrderById(id: string): Promise<any>;
    updateOrderStatus(id: string, status: string): Promise<any>;
    deleteOrder(id: string): Promise<any>;
  }  