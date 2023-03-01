import { Controller, Post, Body, UseGuards, Get, Param } from "@nestjs/common";
import { RoutesService } from "./routes.service";
import { CreateRouteDto } from "./dto/create-route.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/guards/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Route } from "./entities/route.entity";

@ApiTags("Routes")
@Controller("routes")
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @UseGuards(JwtAuthGuard)
  @Roles("STATION")
  @UseGuards(RolesGuard)
  @Post()
  @ApiOperation({ summary: "Create route" })
  @ApiResponse({ status: 200, type: Route })
  async create(@Body() createRouteDto: CreateRouteDto) {
    console.log("LOOOOl");
    return this.routesService.createRoute(createRouteDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all routes" })
  @ApiResponse({ status: 200, type: [Route] })
  async findAll() {
    return this.routesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Find route by id" })
  @ApiResponse({ status: 200, type: Route })
  async findOne(@Param("id") id: string) {
    return this.routesService.findOne(Number(id));
  }
}
