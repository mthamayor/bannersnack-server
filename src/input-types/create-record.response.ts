import { ObjectType, Field } from "type-graphql"

@ObjectType()
class PartialUser {
    @Field()
    id: number

    @Field()
    firstName: string

    @Field()
    lastName: string
}

@ObjectType()
export default class CreateRecordResponse {
    @Field()
    id: number;

    @Field()
    title: string;

    @Field(() => PartialUser)
    user: PartialUser

    @Field()
    createdAt: Date;
}
