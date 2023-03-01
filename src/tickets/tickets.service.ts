import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { type User } from "src/users/entities/user.entity";
import { type CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Ticket } from "./entities/ticket.entity";

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket) private readonly ticketRepository: typeof Ticket
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.create(createTicketDto);
  }

  async getTicketsByUser(userDto: User) {
    return this.ticketRepository.findAll({
      where: { userId: userDto.id },
      include: { all: true },
    });
  }

  async findAll() {
    return this.ticketRepository.findAll({});
  }

  async remove(id: number) {
    return this.ticketRepository.destroy({ where: { id } });
  }
}
