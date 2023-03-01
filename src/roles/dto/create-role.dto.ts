import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: "STATION", description: "Unique role name" })
  readonly value: string;

  @ApiProperty({ example: "main admin", description: "Role description" })
  readonly description: string;
}
