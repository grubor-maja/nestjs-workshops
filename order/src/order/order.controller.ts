import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @MessagePattern('get-orders')
    getOrders() {
        return this.orderService.getOrders();
    }

    @MessagePattern('get-order')
    getOrder(id: string) {
        return this.orderService.getOrder(parseInt(id));
    }

    @MessagePattern('create-order')
    createOrder(data: CreateOrderDto) {
        return this.orderService.createOrder(data);
    }

    @MessagePattern('delete-order')
    deleteOrder(id: string) {
        return this.orderService.deleteOrder(parseInt(id));
    }
}
