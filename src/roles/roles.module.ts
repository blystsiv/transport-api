import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./entities/role.entity";
import { User } from "src/users/entities/user.entity";
import { UserRoles } from "./entities/user-roles.entity";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
})
export class RolesModule {}
