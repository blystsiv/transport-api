import { forwardRef, Module } from "@nestjs/common";
import { RoutesService } from "./routes.service";
import { RoutesController } from "./routes.controller";
import { Route } from "./entities/route.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { BusesModule } from "src/buses/buses.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
  imports: [
    SequelizeModule.forFeature([Route]),
    forwardRef(() => BusesModule),
    AuthModule,
  ],
  exports: [RoutesService],
})
export class RoutesModule {}
