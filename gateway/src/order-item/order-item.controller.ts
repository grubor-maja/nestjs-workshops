import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateOrderItemDto } from 'src/dtos/create-order-item.dto';

@Controller('order-item')
export class OrderItemController {
    @Client({
        transport: Transport.REDIS,
        options: {

        },
    })
    private client: ClientProxy;
    constructor() {}

    @Get('/')
    getOrderItems() {
        return this.client.send('get-order-items',{});
    }

    @Post('/')
    addOrderItem(@Body() body: CreateOrderItemDto) {
        return this.client.send('create-order-item', body);
    }

    @Delete('/:id')
    deleteOrderItem(@Param('id') id: string) {
        return this.client.send('delete-order-item', id);
    }

    @Delete('/remove-product/:id')
    removeByProductId(@Param('id') productId: string) {
        return this.client.send('order-item-remove-by-product-id', productId);
    }
}
