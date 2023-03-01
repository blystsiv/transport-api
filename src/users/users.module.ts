import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { Role } from "src/roles/entities/role.entity";
import { UserRoles } from "src/roles/entities/user-roles.entity";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";
import { Ticket } from "src/tickets/entities/ticket.entity";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    RolesModule,
    SequelizeModule.forFeature([User, Ticket, Role, UserRoles]),
  ],
})
export class UsersModule {}
