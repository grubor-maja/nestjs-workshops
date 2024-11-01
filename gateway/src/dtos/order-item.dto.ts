import { IsNumber } from "class-validator";

export class OrderItemDto {

    @IsNumber()
    id: number;

    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
}