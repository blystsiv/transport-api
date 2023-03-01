import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";

class AuthResponse {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpZCI6Mywicm9sZXMiOltdLCJpYXQiOjE2NjkwNjUyODUsImV4cCI6MTY2OTE1MTY4NX0.3UIsP3wBMkg9G3kIUC_PEkfy_Ma2Vj53h96Y2d2LBnc",
    description: "Unique JWT token",
  })
  readonly token: string;
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: 200, type: AuthResponse })
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post("/register")
  @ApiOperation({ summary: "Registration" })
  @ApiResponse({ status: 200, type: AuthResponse })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
