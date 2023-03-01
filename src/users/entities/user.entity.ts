import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "src/roles/entities/role.entity";
import { UserRoles } from "src/roles/entities/user-roles.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";

type UserCreationAttrs = {
  email: string;
  password: string;
};

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "test@example.com", description: "Unique email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "hashed password", description: "Password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles?: Role[];

  @HasMany(() => Ticket)
  tickets?: Ticket[];
}
