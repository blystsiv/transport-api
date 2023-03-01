import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/guards/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { BusesService } from "./buses.service";
import { CreateBusDto } from "./dto/create-bus.dto";
import { UpdateBusDto } from "./dto/update-bus.dto";
import { Bus } from "./entities/bus.entity";

@ApiTags("Buses")
@Controller("buses")
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @UseGuards(JwtAuthGuard)
  @Roles("STATION")
  @UseGuards(RolesGuard)
  @Post()
  @ApiOperation({ summary: "Create bus" })
  @ApiResponse({ status: 200, type: Bus })
  async create(@Body() createBusDto: CreateBusDto) {
    return this.busesService.create(createBusDto);
  }

  @Get("")
  @ApiOperation({ summary: "Get all buses and routes" })
  @ApiResponse({ status: 200, type: [Bus] })
  async getAllBuses() {
    return this.busesService.schedule();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get bus by id" })
  @ApiResponse({ status: 200, type: Bus })
  async findOne(@Param("id") id: string) {
    return this.busesService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Roles("STATION")
  @UseGuards(RolesGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update bus by id" })
  @ApiResponse({ status: 200, type: Bus })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateBusDto) {
    return this.busesService.update(Number(id), updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("STATION")
  @UseGuards(RolesGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete" })
  @ApiResponse({ status: 200, type: Number })
  async delete(@Param("id") id: string) {
    return this.busesService.remove(Number(id));
  }
}
