import { AutoIncrement, Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import Record from "./record.model";

@ObjectType()
@Table({
  timestamps: true
})
export class User extends Model<User> {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column
  firstName: string;

  @Field()
  @Column
  lastName: string;

  @Field()
  @Column
  email: string;

  @Column
  password: string

  @Field()
  token: string

  @HasMany(() => Record, "userId")
  records: Record[]

  @Field()
  @CreatedAt
  createdAt: Date

  @Field()
  @UpdatedAt
  updatedAt: Date
}

export default User;
