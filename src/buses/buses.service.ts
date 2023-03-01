import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Route } from "src/routes/entities/route.entity";
import { RoutesService } from "src/routes/routes.service";
import { type CreateBusDto } from "./dto/create-bus.dto";
import { type UpdateBusDto } from "./dto/update-bus.dto";
import { Bus } from "./entities/bus.entity";

@Injectable()
export class BusesService {
  constructor(
    @InjectModel(Bus) private readonly busRepository: typeof Bus,
    @InjectModel(Route) private readonly routeRepo: typeof Route,
    private readonly routesService: RoutesService
  ) {}

  async create(createBusDto: CreateBusDto) {
    const bus = await this.busRepository.create(createBusDto);
    const route = await this.routesService.getRouteByName(
      createBusDto.routeName
    );
    bus.route = route;
    bus.routeId = route.id;
    await this.busRepository.update(
      { routeId: route.id },
      { where: { id: bus.id } }
    );
    await this.routeRepo.update({ busId: bus.id }, { where: { id: route.id } });
    return bus;
  }

  async findOne(id: number) {
    return this.busRepository.findByPk(id, { include: { all: true } });
  }

  async schedule() {
    return this.busRepository.findAll({ include: { all: true } });
  }

  async update(id: number, updateUserDto: UpdateBusDto) {
    return this.busRepository.update(updateUserDto, { where: { id } });
  }

  async remove(id: number) {
    return this.busRepository.destroy({ where: { id } });
  }
}
