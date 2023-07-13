import { IsDefined, IsNotEmpty, ValidateNested, IsNumber } from "class-validator";
import { CardDto } from "./card.dto";
import { Type } from "class-transformer";

export class CreateChargeDto {
    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto;

    @IsNumber()
    amount: number;
}