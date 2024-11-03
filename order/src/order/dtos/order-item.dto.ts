import { IsNumber } from "class-validator";

export class OrderItemDto {
    @IsNumber()
    id: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    productId: number;
}