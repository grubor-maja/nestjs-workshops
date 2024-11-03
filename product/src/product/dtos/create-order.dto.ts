import { IsArray, Validate, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {

    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    orderedProducts: OrderItemDto[];
}