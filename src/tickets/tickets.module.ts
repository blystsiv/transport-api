import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { AuthModule } from "src/auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/entities/user.entity";
import { Ticket } from "./entities/ticket.entity";
import { Bus } from "src/buses/entities/bus.entity";

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [AuthModule, SequelizeModule.forFeature([User, Ticket, Bus])],
})
export class TicketsModule {}
