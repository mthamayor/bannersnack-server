import { ObjectType, Field } from "type-graphql"

@ObjectType()
export default class AuthResponse {
  @Field()
  token: string

  @Field()
  id: number

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  createdAt: Date
}
