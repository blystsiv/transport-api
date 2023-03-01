import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/guards/roles.decorator";
import { AddRoleDto } from "./dto/addRole.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { Role } from "src/roles/entities/role.entity";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get my profile" })
  @ApiResponse({ status: 200, type: User })
  @Get("/me")
  async profile(@Request() req) {
    return this.usersService.getMe(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("STATION")
  @UseGuards(RolesGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Patch("/me")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update your profile" })
  @ApiResponse({ status: 200, type: User })
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(Number(req.user.id), updateUserDto);
  }

  @Delete("/me")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete your profile" })
  @ApiResponse({ status: 200, type: Number })
  async delete(@Request() req) {
    return this.usersService.remove(Number(req.user.id));
  }

  @Post("/role")
  @ApiOperation({ summary: "Add role to user" })
  @ApiResponse({ status: 200, type: Role })
  async addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }
}
