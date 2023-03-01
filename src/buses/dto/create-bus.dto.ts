import { IsString, IsNumber, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBusDto {
  @ApiProperty({ example: 567, description: "Number of the bus" })
  @IsNumber({}, { message: "Must be a number exp: (265 - Bus №256)" })
  readonly number: number;

  @ApiProperty({ example: 75, description: "Maximum amount of passengers" })
  @IsNumber({}, { message: "Must be a number" })
  readonly passengersAmount: number;

  @ApiProperty({
    example: "North-Kyiv",
    description: "Name of the route to connect bus with it",
  })
  @IsString({ message: "Must be a string" })
  readonly routeName: string;

  @ApiProperty({
    example: [14, 16, 17],
    description: "Times when bus is starting from fist stop",
  })
  @IsArray()
  readonly startingTime: number[];
}
