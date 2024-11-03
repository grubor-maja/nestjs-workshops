import { IsString, IsNumber } from "class-validator";

export class CreateProductDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()    
    quantity: number;

    @IsNumber() 
    price: number;

    @IsString() 
    imageSrc: string;
}