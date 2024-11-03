import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { Repository } from 'typeorm';
import { Order } from './../../../order/src/order/order.entity';
import { AddOrderItemDto } from 'src/dtos/add-order-item.dto';

@Injectable()
export class OrderItemService {
    constructor(@InjectRepository(OrderItem) private repo: Repository<OrderItem>) {}

    getOrderItems() {
        return this.repo.find();
    }

    getOrderItem(id: number) {
        return this.repo.findOneBy({id});
    }

    getOrderItemByProductId(productId: number) {
        return this.repo.find({where: {productId}});
    }

    async updateOrderItem(productId: number, attrs: Partial<OrderItem>) {
        const orderItems = await this.getOrderItemByProductId(productId);
        if(!orderItems) throw new Error('No order item with given product id.');
        Object.assign(orderItems[0], attrs);
        return await this.repo.save(orderItems);
    }

    async removeOrderItem(id: number) {
        const orderItem = await this.getOrderItem(id);
        if(!orderItem) throw new Error('No order item with given id.');
        return this.repo.remove(orderItem);
    }

    async removeOrderItemByProductId(productId: number) {
        const orderItem = await this.getOrderItemByProductId(productId);
        if(!orderItem) throw new Error('No order item with given product id.');
        return this.repo.remove(orderItem);
    }

    async createOrderItem(body: AddOrderItemDto) {
        const productId = body.productId;
        if(!productId) throw new Error('Product id is required.');
        
        const quantity = body.quantity;
        if(!quantity) throw new Error('Quantity is required.');
        
        const products = await this.getOrderItemByProductId(productId);
        if (products.length === 0) {
            const orderItem = this.repo.create({ productId, quantity });
            return await this.repo.save(orderItem);
          } else {
            products[0].quantity += quantity;
            return await this.repo.save(products[0]);
          }
    }

    async handleOrderCreated() {
        const orderItems = await this.getOrderItems();
        if(!orderItems) throw new Error('No order items found.');
        return this.repo.remove(orderItems);
    }
}
