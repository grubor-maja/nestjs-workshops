import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateOrderDto } from 'src/dtos/create-order.dto';

@Controller('order')
export class OrderController {
    @Client({
        transport: Transport.REDIS,
        options: {

        },
    })
    private client: ClientProxy;
    constructor() {}

    @Get('/')
    getOrders() {
        return this.client.send('get-orders',{});
    }

    @Get('/:id')
    getOrder(@Param('id') id: string) {
        return this.client.send('get-order', id);
    }

    @Post('/')
    createOrder(@Body() body: CreateOrderDto) {
        return this.client.send('create-order', body);
    }

    @Delete('/:id')
    deleteOrder(@Param('id') id: string) {
        return this.client.send('delete-order', id);
    }


}
