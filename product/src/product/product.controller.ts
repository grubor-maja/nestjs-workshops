import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @MessagePattern('get-products')
    getProducts() {
        return this.productService.getProducts();
    }

    @MessagePattern('get-product')
    getProduct(id: string) {
        return this.productService.getProduct(parseInt(id));
    }

    @MessagePattern('create-product')
    createProduct(data: CreateProductDto) {
        return this.productService.createProduct(data.name,data.description, data.quantity, data.price, data.imageSrc);
    }

    @MessagePattern('delete-product')
    deleteProduct(id: string) {
        return this.productService.deleteProduct(parseInt(id));
    }

    @MessagePattern('update-product')
    updateProduct(data: {id: string; body: CreateProductDto}) {
        return this.productService.updateProduct(parseInt(data.id), data.body);
    }

    @EventPattern('order-created')
    handleOrder(data: CreateOrderDto) {
        this.productService.handleOrderCreated(data.orderedProducts);
    }
}
