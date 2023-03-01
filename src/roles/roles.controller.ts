import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./entities/role.entity";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: "Create role" })
  @ApiResponse({ status: 200, type: Role })
  async create(@Body() createRoleDto) {
    console.log(createRoleDto);
    return this.rolesService.createRole(createRoleDto);
  }

  @Get("/:value")
  @ApiOperation({ summary: "Get role by value field" })
  @ApiResponse({ status: 200, type: Role })
  async findAll(@Param("value") value: string) {
    return this.rolesService.getRoleByValue(String(value));
  }
}
