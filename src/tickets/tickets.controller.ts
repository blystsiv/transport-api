import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
} from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/guards/roles.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Ticket } from "./entities/ticket.entity";

@ApiTags("Tickets")
@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles("STATION")
  @UseGuards(RolesGuard)
  @Post()
  @ApiOperation({ summary: "Create ticket" })
  @ApiResponse({ status: 200, type: Ticket })
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("STATION")
  @UseGuards(RolesGuard)
  @Get()
  @ApiOperation({ summary: "Get all tickets" })
  @ApiResponse({ status: 200, type: [Ticket] })
  async findAll() {
    return this.ticketsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("my")
  @ApiOperation({ summary: "Get all tickets of user" })
  @ApiResponse({ status: 200, type: [Ticket] })
  async getTicketsByUser(@Request() req) {
    return this.ticketsService.getTicketsByUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("STATION")
  @UseGuards(RolesGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete" })
  @ApiResponse({ status: 200, type: Number })
  async delete(@Param("id") id: string) {
    return this.ticketsService.remove(Number(id));
  }
}
