import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "test@example.com", description: "Unique email" })
  @IsEmail({}, { message: "Must be a valid email" })
  readonly email: string;

  @ApiProperty({ example: "123456", description: "Password" })
  @IsString({ message: "Must be a string" })
  @Length(4, 16, { message: "Min. length is " })
  readonly password: string;
}
