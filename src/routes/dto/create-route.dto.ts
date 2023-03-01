import { IsString, IsNumber, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRouteDto {
  @ApiProperty({ example: 65, description: "Length of route (km / m / etc)" })
  @IsNumber({}, { message: "Must be a number" })
  readonly length: number;

  @ApiProperty({ example: "North-Kyiv", description: "Name of route" })
  @IsString({ message: "Must be a string" })
  readonly name: string;

  @ApiProperty({
    example: ["Sportyvna", "Prospekt Peremogy", "Pochtova"],
    description: "Name of stops",
  })
  @IsArray()
  readonly stops: string[];

  @ApiProperty({
    example: [10, 15, 20],
    description: "Time of stops (10 - first, 15 - second, 20 - third)",
  })
  @IsArray()
  readonly stopTimes: number[];
}
