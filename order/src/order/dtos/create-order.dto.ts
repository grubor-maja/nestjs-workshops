import { IsArray, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";
import { Type } from "class-transformer";
import { AddOrderItemDto } from "./add-order-item.dto";


export class CreateOrderDto {

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => AddOrderItemDto)
    orderedProducts: AddOrderItemDto[];
}