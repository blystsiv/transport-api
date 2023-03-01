import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Bus } from "src/buses/entities/bus.entity";
import { Route } from "src/routes/entities/route.entity";
import { User } from "src/users/entities/user.entity";

type TicketCreationAttrs = {
  busId: number;
  userId: number;
};

@Table({ tableName: "tickets" })
export class Ticket extends Model<Ticket, TicketCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 52, description: "Id of the user" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  userId: number;

  @BelongsTo(() => User)
  owner: User;

  @ApiProperty({ example: 5, description: "Id of the bus" })
  @ForeignKey(() => Bus)
  @Column({ type: DataType.INTEGER, allowNull: true })
  busId: number;

  @BelongsTo(() => Bus)
  bus: Bus;
}
