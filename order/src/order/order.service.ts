import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
    @Client({
        transport: Transport.REDIS,
        options: {

        },
    })
    private client: ClientProxy;
    constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

    getOrders() {
        return this.repo.find();
    }

    getOrder(id: number) {
        return this.repo.findOneBy({id});
    }

    async createOrder(body: CreateOrderDto) {
        const eventData = [];

        body.orderedProducts.forEach((product) => {
            eventData.push({
                productId: product.productId,
                quantity: product.quantity,
            });
        });

        const order = this.repo.create({ orderedProducts: body.orderedProducts });
        if(order) {
            this.client.emit('order-created', body);
        }
        return await this.repo.save(order);
    }

    async deleteOrder(id: number) {
        const order = await this.getOrder(id);
        if(!order) throw new Error('No order with given id.');
        return this.repo.remove(order);
    }

}
