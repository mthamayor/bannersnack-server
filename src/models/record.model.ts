import { AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import User from "./user.model";

@ObjectType()
@Table({
  timestamps: true
})
export class Record extends Model<Record> {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column
  title: string;

  @BelongsTo(() => User, "userId")
  user: User

  @ForeignKey(() => User)
  @Column
  userId: number

  @Field()
  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

export default Record;
