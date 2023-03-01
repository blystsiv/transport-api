import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { type CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./entities/role.entity";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(createRoleDto);
  }

  async getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }
}
