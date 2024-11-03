import { IsNumber } from "class-validator";

export class OrderItemDto {

    @IsNumber()
    quantity: number;

    @IsNumber()
    productId: number;
}