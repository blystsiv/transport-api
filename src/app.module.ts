import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/entities/role.entity";
import { UserRoles } from "./roles/entities/user-roles.entity";
import { AuthModule } from "./auth/auth.module";
import { BusesModule } from "./buses/buses.module";
import { RoutesModule } from "./routes/routes.module";
import { Route } from "./routes/entities/route.entity";
import { Bus } from "./buses/entities/bus.entity";
import { TicketsModule } from "./tickets/tickets.module";
import { Ticket } from "./tickets/entities/ticket.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Route, Bus, Ticket],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BusesModule,
    RoutesModule,
    TicketsModule,
  ],
})
export class AppModule {}
