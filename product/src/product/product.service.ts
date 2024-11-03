import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { OrderItemDto } from './dtos/order-item.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){}

    getProducts() {
        return this.productRepository.find();
    }

    getProduct(id: number) {
        return this.productRepository.findOneBy({id});
    }

    async createProduct(
        name: string,
        description: string,
        quantity: number,
        price: number,
        imageSrc: string,
    ) {
        const product = this.productRepository.create({
            name,
            description,
            quantity,
            price,
            imageSrc,
        });
        return await this.productRepository.save(product);
    }

    async deleteProduct(id: number) {
        const product = await this.getProduct(id);
        if(!product) throw new Error('No product with given id.');
        return this.productRepository.remove(product);
    }

    async updateProduct(productId: number, attrs: Partial<Product>) {
        const product = await this.getProduct(productId);
        if(!product) throw new Error('No product with given id.');
        
        if(attrs?.quantity) {
            attrs.quantity = product.quantity - attrs.quantity;
        }
        Object.assign(product, attrs);

        return await this.productRepository.save(product);
    }

    async handleOrderCreated(data: OrderItemDto[]) {
        return await Promise.all(
            data.map((orderItem) => {
                return this.updateProduct(orderItem.productId, {quantity: orderItem.quantity});
            })
        )
    }
}
