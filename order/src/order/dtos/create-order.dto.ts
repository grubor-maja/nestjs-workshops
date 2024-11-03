import { IsArray, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";
import { Type } from "class-transformer";


export class CreateOrderDto {

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => OrderItemDto)
    orderedProducts: OrderItemDto[];
}