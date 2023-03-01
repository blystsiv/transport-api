import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Route } from "src/routes/entities/route.entity";

type BusCreationAttrs = {
  number: number;
  passengersAmount: number;
  routeId: number;
  startingTime: number[];
};

@Table({ tableName: "buses" })
export class Bus extends Model<Bus, BusCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 567, description: "Number of the bus" })
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  number: number;

  @ApiProperty({ example: 75, description: "Maximum amount of passengers" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  passengersAmount: number;

  @ApiProperty({
    example: [14, 16, 17],
    description: "Times when bus is starting from fist stop",
  })
  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: false })
  startingTime: number[];

  @ForeignKey(() => Route)
  @ApiProperty({ example: 9, description: "Id of the" })
  @Column({ type: DataType.INTEGER })
  routeId: number;

  @HasOne(() => Route)
  route: Route;
}
