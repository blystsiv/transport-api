import { forwardRef, Module } from "@nestjs/common";
import { BusesService } from "./buses.service";
import { BusesController } from "./buses.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Route } from "src/routes/entities/route.entity";
import { Bus } from "./entities/bus.entity";
import { RoutesModule } from "src/routes/routes.module";
import { AuthModule } from "src/auth/auth.module";
import { Ticket } from "src/tickets/entities/ticket.entity";

@Module({
  controllers: [BusesController],
  providers: [BusesService],
  exports: [BusesService],
  imports: [
    forwardRef(() => RoutesModule),
    SequelizeModule.forFeature([Route, Ticket, Bus]),
    AuthModule,
  ],
})
export class BusesModule {}
