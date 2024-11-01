import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateProductDto } from 'src/dtos/create-product.dto';


@Controller('product')
export class ProductController {
    @Client({
        transport: Transport.REDIS,
        options: {
        },
    })
    private client: ClientProxy;
    construtor() {}
    
    @Get()
    getProducts() {
        return this.client.send('get-products', {});
    }

    @Get('/:id') 
    getProduct(@Param('id') id: string) {
        return this.client.send('get-product',id);
    }

    @Post('/') 
    createProduct(@Body() body: CreateProductDto) {
        return this.client.send('create-product',body)
    }

    @Delete('/:id')
    deleteProduct(@Param('id') id: string) {
        return this.client.send('delete-product',id);
    }

    @Put('/:id')
    updateProduct(@Param('id') id: string, @Body() body: {quantity: number} ) {
        return this.client.send('update-product', {id, body});
    }
}
