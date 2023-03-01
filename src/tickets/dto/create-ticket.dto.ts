import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateTicketDto {
  @ApiProperty({ example: 5, description: "Id of the bus" })
  @IsNumber({}, { message: "Must be a number" })
  readonly busId: number;

  @ApiProperty({ example: 52, description: "Id of the user" })
  @IsNumber({}, { message: "Must be a number" })
  readonly userId: number;
}
