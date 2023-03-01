import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { type CreateRouteDto } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";
import { Route } from "./entities/route.entity";

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route) private readonly routesRepository: typeof Route
  ) {}

  async createRoute(createRouteDto: CreateRouteDto) {
    return this.routesRepository.create(createRouteDto);
  }

  @UseGuards(JwtAuthGuard)
  async getRouteByName(name: string) {
    return this.routesRepository.findOne({ where: { name } });
  }

  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.routesRepository.findAll({ include: { all: true } });
  }

  @UseGuards(JwtAuthGuard)
  async findOne(id: number) {
    return this.routesRepository.findByPk(id, { include: { all: true } });
  }
}
