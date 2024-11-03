import { Controller } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('order-item')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) {}

    @MessagePattern('get-order-items')
    getOrderItems() {
        return this.orderItemService.getOrderItems();
    }

    @MessagePattern('get-order-item')
    getOrderItem(id: string) {
        return this.orderItemService.getOrderItem(parseInt(id));
    }

    @MessagePattern('create-order-item')
    createOrderItem(data: {productId: number; quantity: number}) {
        return this.orderItemService.createOrderItem(data);
    }

    @MessagePattern('delete-order-item')
    deleteOrderItem(id: string) {
        return this.orderItemService.removeOrderItem(parseInt(id));
    }

    @MessagePattern('delete-order-item-by-product-id')
    deleteOrderItemByProductId(productId: string) {
        return this.orderItemService.removeOrderItemByProductId(parseInt(productId));
    }

    @EventPattern('order-created')
    handleOrderCreated() {
        return this.orderItemService.handleOrderCreated();
    }
}
