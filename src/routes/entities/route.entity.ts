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

type RouteCreationAttrs = {
  length: number;
  name: string;
  stops: string[];
  stopTimes: number[];
};

@Table({ tableName: "routes" })
export class Route extends Model<Route, RouteCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "North-Kyiv", description: "Name of route" })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 65, description: "Length of route (km / m / etc)" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  length: number;

  @ApiProperty({
    example: ["Sportyvna", "Prospekt Peremogy", "Pochtova"],
    description: "Name of stops",
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  stops: string[];

  @ApiProperty({
    example: [10, 15, 20],
    description: "Time of stops (10 - first, 15 - second, 20 - third)",
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  stopTimes: number[];

  @ForeignKey(() => Bus)
  @Column({ type: DataType.INTEGER })
  @ApiProperty({ example: 5, description: "Id of the bus for route" })
  busId: number;

  @BelongsTo(() => Bus)
  bus: Bus;
}
