import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { type AddRoleDto } from "./dto/addRole.dto";
import { type CreateUserDto } from "./dto/create-user.dto";
import { type UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const role = await this.rolesService.getRoleByValue("PASSENGER");
    user.roles = [role];
    await user.$set("roles", [role.id]);
    return user;
  }

  async findAll() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getMe(userDto: User) {
    return this.userRepository.findOne({
      where: { id: userDto.id },
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return this.userRepository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(updateUserDto, { where: { id } });
  }

  async remove(id: number) {
    return this.userRepository.destroy({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$add("role", role.id);
      return addRoleDto;
    }

    throw new HttpException("User or role was not found", HttpStatus.NOT_FOUND);
  }
}
