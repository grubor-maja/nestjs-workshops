import { IsNumber } from "class-validator";

export class AddOrderItemDto {

    @IsNumber()
    quantity: number;

    @IsNumber()
    productId: number;
}